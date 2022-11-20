#PLAYERSCRIPT

public def OnUpdate()
    local y = GetINIValue("Test/Counter.ini","Counter","scps","Error")
    text(480,280,y,0,0)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end