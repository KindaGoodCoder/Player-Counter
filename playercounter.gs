#include "includes\multiplayer_core.inc"

global scps = [9,SE_INT]
global cd = [2,SE_INT]
global found = [5,SE_INT]
//SCPs
scps[1] = 5
scps[2] = 6
scps[3] = 10
scps[4] = 11
scps[5] = 12
scps[6] = 13
scps[7] = 14
scps[8] = 15
scps[0] = 16 //forgot it started at 0

//Class D Team
cd[1] = 3
cd[0] = 7
//Security
found[0] = 2
found[1] = 1
found[2] = 8
found[3] = 9
found[4] = 4

global specstext, scptext, foundtext, cdtext = 0

public def OnPlayerGetNewRole()
    local scp = 0, secure = 0, chaos = 0, specs = 0
    local bug //a variable to work around a bug
    local role 
    for x; x < 65; x++
        if IsPlayerConnected(x) == 1 then
            role = GetPlayerType(x)
            if role == 0 then
                specs++
            else
                for y = 0; y < 9; y++
                    bug = scps[y]
                    if bug == role then
                        scp++
                        break
                    end
                    bug = found[y]
                    if bug == role then
                        secure++
                        break
                    end
                    bug = cd[y]
                    if bug == role then
                        chaos++
                        break
                    end
                end
            end
        end
    end
    for spec; spec < 65; spec++
        if IsPlayerConnected(spec) == 1 then
                RemovePlayerText(spec,scptext)
                RemovePlayerText(spec,foundtext)
                RemovePlayerText(spec,cdtext)
                RemovePlayerText(spec,specstext)
            if GetPlayerType(spec) == 0 then
                scptext = CreatePlayerText(spec,"SCPs Remaining: "+ scp, 15, 200, 16711680, "Courier New Rus.ttf", 20) //red
                foundtext = CreatePlayerText(spec,"Security Remaining: "+ secure, 15, 230, 255, "Courier New Rus.ttf", 20) //blue
                cdtext = CreatePlayerText(spec,"CI/Class-D Remaining: "+ chaos, 15, 260, 25600, "Courier New Rus.ttf", 20) //green
                specstext = CreatePlayerText(spec,"Dead Players: "+ specs, 15, 290, 100, "Courier New Rus.ttf", 20)
            end
        end
    end
end