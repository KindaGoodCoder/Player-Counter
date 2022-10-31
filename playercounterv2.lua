scps = {5,6,10,11,12,13,14,15,16}
cd = {3,7,0,0,0,0,0,0,0}
found = {1,2,4,8,9,0,0,0,0}

text = {}

function OnPlayerConnect() OnPlayerGetNewRole(); return -1 end

function playertext(plr,txt,y,clr) return createplayertext(plr,txt, screen_width, screen_height/y, clr, "Courier New Rus.ttf", 20) end

function OnPlayerGetNewRole()
    local scp,secure,chaos,specs = 0,0,0,0 --Reset counter
    for x = 1, 64 do --Loop tho each plr
        if isplayerconnected(x) == 1 then --connected

            for y = 1, 9 do --Loop tho team roles lists. 9 is the max list

                if pcall(function()
                    local select = {
                    [0] = function() specs = specs + 1 end,
                    [scps[y]] = function() scp = scp + 1 end,
                    [found[y]] = function() secure = secure + 1 end,                        
                    [cd[y]] = function() chaos = chaos + 1 end,
                    [17] = function() end
                    }
                    select[getplayertype(x)]()
                end) then break end

            end
            
        end
    end
    for spec = 1, 64 do
        if isplayerconnected(spec) == 1 then

            for x = 1, 4 do removeplayertext(spec,text[x]) end

            if getplayertype(spec) == 0 then

                screen_width = getplayermonitorwidth(spec)/45
                screen_height = getplayermonitorheight(spec)
                text[1] = playertext(spec,"SCPs Remaining: ".. tostring(scp), 2.4,16711680) --red
                text[2] = playertext(spec,"Security Remaining: ".. tostring(secure), 2.08, 255) --blue
                text[3] = playertext(spec,"CI/Class-D Remaining: ".. tostring(chaos), 1.84, 25600) --green
                text[4] = playertext(spec,"Dead Players: ".. tostring(specs), 1.65, 255255255) --God knows

            end

        end
    end
    return -1
end