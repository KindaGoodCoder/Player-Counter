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
    local scp,secure,chaos,specs = 0,0,0,0   
    for x = 1, 64 do        
        if isplayerconnected(x) == 1 then
            for y = 0, 9 do
                local role = getplayertype(x)
                if role == 0 then
                    specs = specs + 1
                    break
                elseif role == scps[y] then
                    scp = scp + 1
                    break
                elseif role == found[y] then
                    secure = secure + 1
                    break
                elseif role == cd[y] then
                    chaos = chaos + 1
                    break
                end
            end
        end
    end
    for spec = 1, 64 do
        if isplayerconnected(spec) == 1 then
            print("pain")
            for x = 0, 3 do removeplayertext(spec,text[x]) end
            if getplayertype(spec) == 0 then
                print("working")
                screen_width = getplayermonitorwidth(spec)/45
                screen_height = getplayermonitorheight(spec)
                text[0] = playertext(spec,"SCPs Remaining: "+ scp, 2.4,16711680) //red
                text[1] = playertext(spec,"Security Remaining: "+ secure, 2.08, 255) //blue
                text[2] = playertext(spec,"CI/Class-D Remaining: "+ chaos, 1.84, 25600) //green
                text[3] = playertext(spec,"Dead Players: "+ specs, 1.65, 255255255) //God knows
            end
        end
    end
    return -1
end