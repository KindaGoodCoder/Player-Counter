#include "includes\multiplayer_core.inc"
#include "str_util.gs"

global CurrentPlayerTypes   = [MAX_PLAYERS, SE_INT]

global j = 0
global previousDeadCount = -1

public def OnPlayerChat(playerid, text)
    if instr (text, "/dead", 1)
    SendMessage(playerid, "Total Players Dead: " + j)
    return 0
end

//Detects Players
public def OnPlayerGetNewRole(playerid, oldtype, newtype)
    CurrentPlayerTypes[playerid] = int(newtype)
    if CurrentPlayerTypes[playerid] = 0 then
        j++
    else 
        previousDeadCount = j
    end
end

public def OnPlayerRequestNewRole(playerid, playertype)
    CurrentPlayerTypes[playerid] = int(playertype) 
    if CurrentPlayerTypes[playerid] = 0 then
        j++
    else 
        previousDeadCount = j
    end
end

public def OnPlayerEscape(playerid, currenttype, previoustype)
    CurrentPlayerTypes[playerid] = int(currenttype)
    if CurrentPlayerTypes[playerid] = 0 then
        j++
    else 
        previousDeadCount = j
    end
end

public def OnPlayerEscapeButDead(playerid, currenttype, previoustype)
  CurrentPlayerTypes[playerid] = int(currenttype)
  if CurrentPlayerTypes[playerid] = 0 then
        j++
    else 
        previousDeadCount = j
    end
end