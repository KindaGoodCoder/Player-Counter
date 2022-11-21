#PLAYERSCRIPT

global counter

public def OnReceiveRawPacket(data)
    PeekByte(data)
    counter = [4,SE_INT]
    data = "64|64|64|64"

    for x = 0; x < 3; x++
        pos = Instr(data,"|",1)        
        counter[x] = Left(data,pos-1)
        data = Right(data,len data - pos)
    end
    
    counter[3] = data

end

public def OnUpdate()
    text(480,280,scps,0,0)
    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end