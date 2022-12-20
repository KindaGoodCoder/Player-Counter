scps = {5,6,10,11,12,13,14,15,16} --Team roles
cd = {3,7,0,0,0,0,0,0,0}
found = {1,2,4,8,9,0,0,0,0}

function OnScriptLoaded() --Check if script loaded
    print("PlayerCounter")
    return -1
end

function OnPlayerConnect(plr)
    sendscript(plr,"Player-Counter/PlayerTxt.gsc","Vault/Player-Counter/playercounter.gsc") --Send player (local) script to joining player
    OnPlayerGetNewRole()    
    return -1 --Update counter when people join game
end

function OnPlayerDisconnect() OnPlayerGetNewRole(); return -1 end --Update counter when people leave

function OnPlayerConsole(_,msg) --Update counter if command is run
    local select = {
        ["updatecounter"] = function() OnPlayerGetNewRole() end,
        ["counterscript"] = function()
            plr_loop(function(plr) sendscript(plr,"Player-Counter/PlayerTxt.gsc","Vault/Player-Counter/playercounter.gsc") end)
            OnPlayerGetNewRole()
        end
    }
    msg = string.lower(msg:gsub("%s+","")) -- Remove Whitespace
    if type(select[msg]) == "function" then select[msg]() end
    return -1
end

function plr_loop(Run_Function) for plr = 1, 64 do if isplayerconnected(plr) == 1 then Run_Function(plr) end end end
-- Run Function for every connected player in server

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
                [cd[y]] = function() chaos = chaos + 1 end --If Chaos/CD
            }
            --Execute function depending on playertype
            if type(select[getplayertype(x)]) == "function" then select[getplayertype(x)](); break end --If the function doesn't raise an error, then move on
            
        end
    end)

    data = createbank(12) --Create data bank. Can be shared between server and client
    pokebyte(data,0,106) --Confirmaton Code to confirm bank is sent from Player-Counter
    for x,v in ipairs({scp,secure,chaos,specs}) do pokebyte(data,x,v) end --Add each counter to a section of the data bank. (Positions 0,1,2,3 specifically)
    
    -- In Lua, to get the number and value in a list, u use a for in loop. ipairs splits each item in the list into its value and index.

    plr_loop(function(plr)
        pokebyte(data, 5, getplayertype(plr)) --The last slot will be for playertype (Less complicated then calculating it). Confirm if spectator or not
        sendrawpacket(plr,data) --Send the data
    end) --data[4] will be overridden every loop

    freebank(data) --Delete bank. Won't be needed until next role update which recreates it
    return -1
end