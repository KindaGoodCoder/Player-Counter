scps = {5,6,10,11,12,13,14,15,16} --Team roles
cd = {3,7,0,0,0,0,0,0,0}
found = {1,2,4,8,9,0,0,0,0}

text = {} --List for playertext

function OnScriptLoaded() --Check if script loaded
    print("PlayerCounter")    
    return -1
end

function OnPlayerConnect(plr)
    sendscript(plr,"Player-Counter/PlayerTxt.gsc","Test/playercounter.gsc")        
    OnPlayerGetNewRole()    
    return -1 --Update counter when people join game
end

function OnPlayerDisconnect() OnPlayerGetNewRole(); return -1 end

function plr_loop(Run_Function) for plr = 1, 64 do if isplayerconnected(plr) == 1 then Run_Function(plr) end end end

function OnPlayerGetNewRole()
    --setplayertype(1,14) --For debugging
    local scp,secure,chaos,specs = 0,0,0,0 --Reset counter

    plr_loop(function(x)
        for y = 1, 9 do --Loop tho team roles lists. 9 is the max list

            --Will keep attempting select case until loop finishes
            local select = {
                [0] = function() specs = specs + 1 end, --If spectator
                [scps[y]] = function() scp = scp + 1 end, --If SCP
                [found[y]] = function() secure = secure + 1 end,  --If Foundation                      
                [cd[y]] = function() chaos = chaos + 1 end, --If Chaos/CD
                [17] = function() end
            }
            --Execute function depending on playertype
            if type(select[getplayertype(x)]) == "function" then select[getplayertype(x)](); break end --If the function doesn't raise an error, then move on
            
        end
    end)
    print(string.format("%d:%d:%d:%d",scp,secure,chaos,specs))
    data = createbank(11)
    for x,v in ipairs({scp,secure,chaos,specs}) do pokebyte(data,x-1,v) end

    plr_loop(function(plr)
        pokebyte(data, 4, getplayertype(plr))
        sendrawpacket(plr,data)
    end)

    freebank(data)
    return -1
end