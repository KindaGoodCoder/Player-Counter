#PLAYERSCRIPT

public def OnUpdate()
    local x = ReadFile("Test/Counter.txt")
    local y = ReadInt(x)
    text(480,280,y,0,0)
    CloseFile(x)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end