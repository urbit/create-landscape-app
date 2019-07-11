:: Importing the server library.
/+  *server
:: This imports the tile's JS file from the file system as a variable.
/=  tile-js
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/%APPNAME%/js/tile
  /|  /js/
      /~  ~
  ==
=,  format
:: This core defines the moves (system calls) the application makes, as well as their types.
|%
:: +move: output effect
::
+$  move  [bone card]
:: +card: output effect payload
::
+$  poke
  $%  [%launch-action [@tas path @t]]
  ==
::
+$  card
  $%  [%poke wire dock poke]
      [%http-response =http-event:http]
      [%connect wire binding:eyre term]
      [%diff %json json]
  ==
::
--
::
|_  [bol=bowl:gall ~]
:: "this" is a shorthand for returning the state.
++  this  .
::
++  bound
  |=  [wir=wire success=? binding=binding:eyre]
  ^-  (quip move _this)
  [~ this]
:: The prep arm sets up the application when it first starts up or when the source code is updated.
:: We poke the launch app, which serves the tiles in the Modulo interface, with the app name, 
:: the unique path to subscribe to our app (where to send JSON to the tile) and the path the tile's served on.
:: The launch app expects window.[appNameTile] to contain the JS class for the tile (see tile/tile.js:47).
++  prep
  |=  old=(unit ~)
  ^-  (quip move _this)
  =/  launcha
    [%launch-action [%%APPNAME% /%APPNAME%tile '/~%APPNAME%/js/tile.js']]
  :_  this
  :~
    [ost.bol %connect / [~ /'~%APPNAME%'] %%APPNAME%]
    [ost.bol %poke /%APPNAME% [our.bol %launch] launcha]
  ==
:: This allows other apps (or the wider internet) to subscribe to this app.
:: It sends a bunted JSON type (*json) because in this application there is no state to send.
:: If you have a state, you won't send a bunted JSON type.
++  peer-%APPNAME%tile
  |=  pax=path
  ^-  (quip move _this)
  [[ost.bol %diff %json *json]~ this]
:: When this arm is called from this application, 
:: it sends moves to every subscriber of this application's unique path.
++  send-tile-diff
  |=  jon=json
  ^-  (list move)
  %+  turn  (prey:pubsub:userlib /%APPNAME%tile bol)
  |=  [=bone ^]
  [bone %diff %json jon]
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol move this)
  |=  =inbound-request:eyre
  ^-  (quip move _this)
  =/  request-line  (parse-request-line url.request.inbound-request)
  =/  back-path  (flop site.request-line)
  =/  name=@t
    =/  back-path  (flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ::
  ?~  back-path
    [[ost.bol %http-response not-found:app]~ this]
  ?:  =(name 'tile')
    [[ost.bol %http-response (js-response:app tile-js)]~ this]
  [[ost.bol %http-response not-found:app]~ this]
::
--
