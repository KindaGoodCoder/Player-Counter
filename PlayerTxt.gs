#PLAYERSCRIPT

global counter = [4,SE_INT]

public def OnReceiveRawPacket(data)
    counter[0] = peekint(data,0)
    counter[1] = peekint(data,1)
    counter[2] = peekint(data,2)
    counter[3] = peekint(data,3)
    freebank(data)
end

public def OnUpdate()
    local width = getmonitorwidth()/45
    local height = getmonitorheight()

    text(width,height/2.4,counter[0],0,0)
    text(width,height/2.08,counter[1],0,0)
    text(width,height/1.84,counter[2],0,0)
    text(width,height/1.65,counter[3],0,0)

    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end