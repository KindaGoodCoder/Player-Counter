#include "includes\multiplayer_core.inc" 
scps = [9,SE_INT]
cd = [2,SE_INT]
found = [5,SE_INT]
//SCPs
scps[1] = TYPE_173
scps[2] = TYPE_049
scps[3] = TYPE_939
scps[4] = TYPE_106
scps[5] = TYPE_096
scps[6] = TYPE_035
scps[7] = TYPE_860
scps[8] = TYPE_ZOMBIE
scps[0] = TYPE_966 //forgot it started at 0
//Class D Team
cd[1] = TYPE_CLASSD
cd[0] = TYPE_CHAOS
//Security
found[0] = TYPE_GUARD
found[1] = TYPE_NTF
found[2] = TYPE_JANITOR
found[3] = TYPE_WORKER
found[4] = TYPE_SCIENTIST

specs = [65,SE_INT]

public def OnPlayerGetNewRole()
    for x; x < 65;x++
        if IsPlayerConnected(x) then
            local role = GetPlayerType(x)
            if role == 0 then
                for y; y < 65;y++
                    if specs[y] == 0 then
                        specs[y] == x
                        break
                    end
                end
            end
        end
    end
end