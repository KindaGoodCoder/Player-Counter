#PLAYERSCRIPT

public def OnReceiveRawPacket(data)
    PeekByte(data)
end

public def OnUpdate()
    text(480,280,scps,0,0)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end