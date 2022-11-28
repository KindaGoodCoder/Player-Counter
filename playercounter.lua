scps = {5,6,10,11,12,13,14,15,16} --Team roles
cd = {3,7,0,0,0,0,0,0,0}
found = {1,2,4,8,9,0,0,0,0}

text = {} --List for playertext

function OnScriptLoaded() --Check if script loaded
    print("PlayerCounter")
    return -1
end

function plr_loop(Run_Function) for plr = 1, 64 do if isplayerconnected(plr) == 1 then Run_Function(plr) end end end

function OnPlayerConnect() OnPlayerGetNewRole(); return -1 end --Update counter when people join game

function OnPlayerDisconnect() OnPlayerGetNewRole(); return -1 end --Update counter when people leave game

function OnPlayerGetNewRole()

    update = function()
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

        -- print(specs)
        -- print(scp)
        -- print(secure)
        -- print(chaos) --Debugging

        plr_loop(function(spec)

            for x = 1, 4 do removeplayertext(spec,text[x]) end

            if getplayertype(spec) == 0 then

                local playertext = function(txt,y,clr) return createplayertext(spec,txt, screen_width, screen_height/y, clr, "Courier New Rus.ttf", 20) end

                screen_width = getplayermonitorwidth(spec)/45 --Get player screen size and maths is performed here and in the playertext() function
                screen_height = getplayermonitorheight(spec)
                text[1] = playertext("SCPs Remaining: " .. scp, 2.4,16711680) --red
                text[2] = playertext("Security Remaining: " .. secure, 2.08, 255) --blue
                text[3] = playertext("CI/Class-D Remaining: " .. chaos, 1.84, 25600) --green
                text[4] = playertext("Dead Players: " .. specs, 1.65, 255255255) --God knows

            end

        end)
        
        return -1 --Cause LUA breaks without return -1 according to Ne4to
    end

    update()
    createtimer("update",1500,0) --Cause GUI sometimes bugs out
    createtimer("update",3000,0)
    return -1
end