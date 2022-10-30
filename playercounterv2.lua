scps = {5,6,10,11,12,13,14,15,16}
cd = {3,7}
found = {1,2,4,8,9}

function OnPlayerConnect()
    OnPlayerGetNewRole()
    return -1
end

function playertext(plr,txt,y,clr)
    return createplayertext(plr,txt, screen_width, screen_height/y, clr, "Courier New Rus.ttf", 20)
end

text = {}

function OnPlayerGetNewRole()
    print("lego")
    local scp,secure,chaos,specs = 0,0,0,0   
    for x = 1, 64 do        
        if isplayerconnected(x) == 1 then
            for y = 1, 9 do
                local counter = function (x) x = x + 1; break 
                local select = {
                    [0] = pcall(counter(specs)) end
                    -- [scps[y]] = function(x) scp = scp + 1; break end,
                    -- [cd[y]] = function(x) secure = secure + 1; break end,
                    -- [found[y]] = function(x) chaos = chaos + 1; break end,
                    -- [17] = function(x) end
                }
                -- select[getplayertype(x)]()
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