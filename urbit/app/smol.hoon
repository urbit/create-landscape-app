/+  *server, default-agent, verb
/=  tile-js
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/%APPNAME%/js/tile
  /|  /js/
      /~  ~
  ==
=,  format
::
|%
+$  card  card:agent:gall
--
%+  verb  |
^-  agent:gall
|_  =bowl:gall
+*  this  .
    def   ~(. (default-agent this %|) bowl)
::
++  on-init
  ^-  (quip card _this)
  =/  launcha
    [%launch-action !>([%add %%APPNAME% /%APPNAME%tile '/~%APPNAME%/js/tile.js'])]
  :_  this
  :~  [%pass / %arvo %e %connect [~ /'~%APPNAME%'] %%APPNAME%]
      [%pass /%APPNAME% %agent [our.bowl %launch] %poke launcha]
  ==
++  on-save   on-save:def
++  on-load   on-load:def
++  on-poke
  |=  [=mark =vase]
  ^-  (quip card _this)
  ?+    mark  (on-poke:def mark vase)
      %handle-http-request
    =+  !<([eyre-id=@ta =inbound-request:eyre] vase)
    :_  this
    %+  give-simple-payload:app  eyre-id
    %+  require-authorization:app  inbound-request
    |=  =inbound-request:eyre
    =/  request-line  (parse-request-line url.request.inbound-request)
    =/  back-path  (flop site.request-line)
    =/  name=@t
      =/  back-path  (flop site.request-line)
      ?~  back-path
        ''
      i.back-path
    ::
    ?~  back-path
      not-found:gen
    ?:  =(name 'tile')
      (js-response:gen tile-js)
    not-found:gen
  ::
  ::  SAMPLE TILE APP
  ::
      %json
    ~&  [%on-poke %json json=!<(json vase)]
    =/  put  ((om:dejs:format same) !<(json vase))
    =/  act  (so:dejs:format (~(got by put) %action))
    =/  sponsor
      sponsor+s+(scot %p (sein:title our.bowl now.bowl our.bowl))
    =/  date
      date+s+(scot %da now.bowl)
    =/  =json
      %-  pairs:enjs:format
      ?:  =(act 'sponsor')
        :~(sponsor)
      ?:  =(act 'date')
        :~(date)
      ?:  =(act 'both')
        :~(sponsor date)
      ~&  >>  [%on-poke %unknown action=act]
      :~(unknown+s+act)
    :_  this
    [%give %fact ~[/%APPNAME%tile] %json !>(json)]~
  ::
  ::  SAMPLE END
  ::
  ==
::
++  on-watch
  |=  =path
  ^-  (quip card _this)
  ?+    path  (on-watch:def path)
      [%http-response *]  `this
      [%%APPNAME%tile ~]
  ::
  ::  SAMPLE TILE APP
  ::
    ::  you could do this (empty javascript object):
    ::  :_  this
    ::  [%give %fact ~[/%APPNAME%tile] %json !>(*json)]~
    ::
    ::  or this (nothing sent to browser):
    ::  `this
    ::
    ::  we'll do this (sample tile app):
    =/  =json
      %-  pairs:enjs:format
      :~(sponsor+s+'???' date+s+'!!!')
    :_  this
    [%give %fact ~[/%APPNAME%tile] %json !>(json)]~
  ::
  ::  SAMPLE END
  ::
  ==
::
++  on-leave  on-leave:def
++  on-peek   on-peek:def
++  on-agent  on-agent:def
++  on-arvo
  |=  [=wire =sign-arvo]
  ^-  (quip card _this)
  ?.  ?=(%bound +<.sign-arvo)
    (on-arvo:def wire sign-arvo)
  [~ this]
::
++  on-fail   on-fail:def
--
