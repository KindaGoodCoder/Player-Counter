#PLAYERSCRIPT

global counter = [4,SE_INT]
global font,role,width,height

public def OnLaunchGame()
    font = loadfont("Courier New Rus.ttf",20)
end

def createtext(heightdiv,txt,index)
    formattext(width,height/heightdiv,txt + counter[index],0,0,3,0)
end

public def OnDisconnect()
    freefont(font)
end
public def OnReceiveRawPacket(data)
    counter[0] = peekbyte(data,0)
    counter[1] = peekbyte(data,1)
    counter[2] = peekbyte(data,2)
    counter[3] = peekbyte(data,3)
    role = peekbyte(data,4)
    freebank(data)
end

public def OnUpdate()
        
    width = getmonitorwidth()/45
    height = getmonitorheight()
    if role == 0 then
        setfont(font)
        color(255,0,0)
        createtext(2.4,"SCPs Remaining: ", 0)
        color(0,255,0)
        createtext(2.08,"Security Remaining: ",1)
        color(0,0,255)
        createtext(1.84,"Insurgents Remaining: ", 2)
        color(255,255,255)
        createtext(1.65,"Dead Players: ", 3)
    end

    if MouseHit2() then
        SetGameMessage("Misery",1)
    end
end