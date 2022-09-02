#include "includes\multiplayer_core.inc"
#include "str_util.gs"

public def OnPlayerChat(playerid, text)    
    if instr (text, "/dead", 1) then
        local ded = 0
        for plr; plr < 65; plr++
            if IsPlayerConnected(plr) == 1 then
                if GetPlayerType(plr) == 0 then
                    ded++
                end
            end
        end
        SendMessage(playerid, ded + " people are ded")
        return 0
    end
    return 1
end