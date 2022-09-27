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

global text = [4,SE_INT]

public def OnPlayerConnect()
    OnPlayerGetNewRole()
end

public def OnPlayerGetNewRole()
    local scp = 0, secure = 0, chaos = 0, specs = 0
    for x; x < 65; x++
        if IsPlayerConnected(x) == 1 then
            for y = 0; y < 9; y++
                select GetPlayerType(x)
                    case 0
                        specs++; break
                    case scps[y]
                        scp++
                        break
                    case found[y]
                        secure++
                        break
                    case cd[y]
                        chaos++
                        break
                end
            end
        end
    end
    for spec; spec < 65; spec++
        if IsPlayerConnected(spec) == 1 then
            for x = 0; x < 4; x++ 
                RemovePlayerText(spec,text[x])
            end
            if GetPlayerType(spec) == 0 then
                text[0] = CreatePlayerText(spec,"SCPs Remaining: "+ scp, 15, 200, 16711680, "Courier New Rus.ttf", 20) //red
                text[1] = CreatePlayerText(spec,"Security Remaining: "+ secure, 15, 230, 255, "Courier New Rus.ttf", 20) //blue
                text[2] = CreatePlayerText(spec,"CI/Class-D Remaining: "+ chaos, 15, 260, 25600, "Courier New Rus.ttf", 20) //green
                text[3] = CreatePlayerText(spec,"Dead Players: "+ specs, 15, 290, 255255255, "Courier New Rus.ttf", 20)
            end
        end
    end
end