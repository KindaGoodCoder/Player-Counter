#PLAYERSCRIPT

public def OnUpdate()
    local x = GetINIValue("Counter.ini","Counter","scps","Error")
    text(480,280,x,0,0)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end