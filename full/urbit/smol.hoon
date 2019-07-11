/-  hall
/+  *server, chat, hall-json
/=  index
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chat/index
  /|  /html/
      /~  ~
  ==
/=  tile-js
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chat/js/tile
  /|  /js/
      /~  ~
  ==
/=  script
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chat/js/index
  /|  /js/
      /~  ~
  ==
/=  style
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/chat/css/index
  /|  /css/
      /~  ~
  ==
:: This iterates over item in the img directory, takes their filenames
:: at @tas (knots), takes the file as @ (binary) and runs it through the 
:: png mark.
/=  chat-png
  /^  (map knot @)
  /:  /===/app/chat/img  /_  /png/
::
=,  chat
::
|_  [bol=bowl:gall sta=state]
::
++  this  .
::
::  +prep: set up the app, migrate the state once started
::
++  prep
  |=  old=(unit state)
  ^-  (quip move _this)
  =/  launcha/poke
    [%launch-action [%chat /chattile '/~chat/js/tile.js']]
  ?~  old
    :_  this
    :~ 
        :: %connect here tells %eyre to mount at the /~chat endpoint.
        [ost.bol %connect / [~ /'~chat'] %chat]
        [ost.bol %poke /chat [our.bol %launch] launcha]
    ==
  :-  [ost.bol %poke /chat [our.bol %launch] launcha]~
  this(sta u.old)
::
::
++  peer-chattile
  |=  wir=wire
  ^-  (quip move _this)
  :_  this
  [ost.bol %diff %json *json]~
::
::  +peer-messages: subscribe to subset of messages and updates
::
::
++  peer-primary
  |=  wir=wire
  ^-  (quip move _this)
  [~ this]
::
::  +poke-chat: send us an action
::
++  poke-chat-action
  |=  act=action:chat
  ^-  (quip move _this)
  [~ this] 
::
::  +send-chat-update: utility func for sending updates to all our subscribers
::
++  send-chat-update
  |=  [upd=update str=streams]
  ^-  (list move)
  =/  updates/(list move)
    %+  turn  (prey:pubsub:userlib /primary bol)
    |=  [=bone *]
    [bone %diff %chat-update upd]
  ::
  =/  tile-updates/(list move)
    %+  turn  (prey:pubsub:userlib /chattile bol)
    |=  [=bone *]
    [bone %diff %json *json]
  ::
  %+  weld
    updates
    tile-updates

::
::  +lient arms
::
::
::  +bound: lient tells us we successfully bound our server to the ~chat url
::
++  bound
  |=  [wir=wire success=? binding=binding:eyre]
  ^-  (quip move _this)
  [~ this]
::
::  +poke-handle-http-request: serve pages from file system based on URl path
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol move this)
  |=  =inbound-request:eyre
  ^-  (quip move _this)
  ::
  =+  request-line=(parse-request-line url.request.inbound-request)
  =/  name=@t
    =+  back-path=(flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ?:  =(name 'tile')
    [[ost.bol %http-response (js-response:app tile-js)]~ this]
  ?+  site.request-line
    :_  this
    [ost.bol %http-response not-found:app]~
  ::
  ::  styling
  ::
      [%'~chat' %css %index ~]
    :_  this
    [ost.bol %http-response (css-response:app style)]~
  ::
  ::  javascript
  ::
      [%'~chat' %js %index ~]
    :_  this
    [ost.bol %http-response (js-response:app script)]~
  ::
  ::  images
  ::
      [%'~chat' %img *]
    =/  img  (as-octs:mimes:html (~(got by chat-png) `@ta`name))
    :_  this
    [ost.bol %http-response (png-response:app img)]~
  ::
  ::  inbox page
  ::
     [%'~chat' *]
    :_  this
    [ost.bol %http-response (html-response:app index)]~
  ==
::
--
