#PLAYERSCRIPT

public def OnUpdate()
    text(480,280,"misery",0,0)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end