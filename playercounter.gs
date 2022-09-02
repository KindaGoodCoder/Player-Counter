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

specs = [64, SE_INT]

global scptext,foundtext,cdtext = 0

public def OnPlayerGetNewRole()
    print(scps)
    local scp = 0
    local secure = 0
    local chaos = 0
    print("lego")
    local bug //a variable to work around a bug
    local role 
    for x; x < 65; x++
        if IsPlayerConnected(x) == 1 then
            role = GetPlayerType(x)
            if role == 0 then
                for y; y < 65; y++
                    bug = specs[y]
                    print(bug)
                    if bug == 0 then
                        specs[y] = x
                        break
                    end
                end
            else
                print("hurry")
                for y; y <= 9; y++
                    bug = scp[y]
                    print(bug)
                    if scps[y] == role then
                        scp++
                        break
                    end
                    bug = found[y]
                    print(bug)
                    if found[y] == role then
                        print("lego")
                        secure++
                        break
                    end
                    bug = cd[y]
                    print(bug)
                    if cd[y] == role then
                        chaos++
                        break
                    end
                end
            end
        end
    end
    for spectator; spectator < 65; spectator++
        print(len specs)
        print("this")
        spec = specs[spectator]
        if IsPlayerConnected(spec) == 1 then
            if scptext != 0 then
                RemovePlayerText(spec,scptext)
                RemovePlayerText(spec,foundtext)
                RemovePlayerText(spec,cdtext)
            end
            if GetPlayerType(spec) == 0 then
                scptext = CreatePlayerText(spec,"SCPs Remaining: "+ scp, 50, 200, 1530000, "Courier New Rus.ttf", 20)
                foundtext = CreatePlayerText(spec,"Foundation Personnel remaining: "+ secure, 0, 200, 30, "Courier New Rus.ttf", 20)
                cdtext = CreatePlayerText(spec,"Human Intruders Remaining: "+ chaos, 0, 200, 256, "Courier New Rus.ttf", 20)
                print("no")
                continue
            end
        end
        specs[spectator] = 0
    end
end