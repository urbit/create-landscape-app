::
::
/?  309
::
/-  hall
/+  %APPNAME%, hall-json
::
|_  str=streams:%APPNAME%
++  grow
  |%
  ++  json
    =,  enjs:format
    ^-  ^json
    %+  frond  %%APPNAME%
    %-  pairs
    :~  
      ::
        [%inbox (conf:enjs:hall-json inbox.str)]
      ::
        :-  %configs
        %-  pairs
        %+  turn  ~(tap by configs.str)
          |=  [cir=circle:hall con=(unit config:hall)]
          ^-  [@t ^json]
          :-  (crip (circ:en-tape:hall-json cir))
          ?~(con ~ (conf:enjs:hall-json u.con))
      ::
        :-  %circles  :-  %a
        %+  turn  ~(tap in circles.str)
          |=  nom=name:hall
          [%s nom]
      ::
        :-  %peers
        %-  pairs
        %+  turn  ~(tap by peers.str)
          |=  [cir=circle:hall per=(set @p)]
          ^-  [@t ^json]
          :-  (crip (circ:en-tape:hall-json cir))
          [%a (turn ~(tap in per) ship)]
      ::
    ==
  --
::
++  grab
  |%
  ++  noun  streams:%APPNAME%
  --
--
