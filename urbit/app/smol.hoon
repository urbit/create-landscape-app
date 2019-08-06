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
:: This core defines the effects the application makes, as well as their types.
|%
:: +effect: output effect
::
+$  effect  (pair bone syscall)
:: +syscall: output effect payload
::
+$  poke
  $%  [%launch-action [@tas path @t]]
  ==
::
+$  syscall
  $%  [%poke wire dock poke]
      [%http-response =http-event:http]
      [%connect wire binding:eyre term]
      [%diff %json json]
  ==
::
--
::
|_  [bol=bowl:gall ~]
++  bound
  |=  [wir=wire success=? binding=binding:eyre]
  ^-  (quip effect _+>.$)
  [~ +>.$]
:: The prep arm sets up the application when it first starts up or when the source code is updated.
:: We poke the launch app, which serves the tiles in the Modulo interface, with the app name, 
:: the unique path to subscribe to our app (where to send JSON to the tile) and the path the tile's served on.
:: The launch app expects window.[appNameTile] to contain the JS class for the tile (see tile/tile.js:47).
++  prep
  |=  old=(unit ~)
  ^-  (quip effect _+>.$)
  =/  launcha
    [%launch-action [%%APPNAME% /%APPNAME%tile '/~%APPNAME%/js/tile.js']]
  :_  +>.$
  :~
    [ost.bol %connect / [~ /'~%APPNAME%'] %%APPNAME%]
    [ost.bol %poke /%APPNAME% [our.bol %launch] launcha]
  ==
::
:: peer-%APPNAME%tile allows other apps (or the wider internet) to subscribe to this app.
:: In this example, it sends "our.bol" (our ship's name) as a JSON string to our React.js file.
:: If you have nothing to send to the tile -- if the tile has nothing to receive from your ship --
:: you'll want to "bunt" (sending a blank with *) the JSON: delete line 62 and replace line 63 with
:: [[ost.bol %diff %json *json]~ +>.$]
::
++  peer-%APPNAME%tile
  |=  pax=path
  ^-  (quip effect _+>.$)
  =/  jon=json  [%s (crip (scow %p our.bol))]
  [[ost.bol %diff %json jon]~ +>.$]

:: When this arm is called from this application, 
:: it sends effects to every subscriber of this application's unique path.
++  send-tile-diff
  |=  jon=json
  ^-  (list effect)
  %+  turn  (prey:pubsub:userlib /%APPNAME%tile bol)
  |=  [=bone ^]
  [bone %diff %json jon]
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol effect .)
  |=  =inbound-request:eyre
  ^-  (quip effect _+>.$)
  =/  request-line  (parse-request-line url.request.inbound-request)
  =/  back-path  (flop site.request-line)
  =/  name=@t
    =/  back-path  (flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ::
  ?~  back-path
    [[ost.bol %http-response not-found:app]~ +>.$]
  ?:  =(name 'tile')
    [[ost.bol %http-response (js-response:app tile-js)]~ +>.$]
  [[ost.bol %http-response not-found:app]~ +>.$]
::
--
