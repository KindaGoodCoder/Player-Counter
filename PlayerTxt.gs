#PLAYERSCRIPT

global counter = [4,SE_INT]
global font,role,width,height

public def OnLaunchGame()
    font = loadfont("Courier New Rus.ttf",20)
    setfont(font)
end

def createtext(heightdiv,txt,index,r,g,b)
    color(r,g,b)
    text(width,height/heightdiv,txt + counter[index],0,0)
end

public def OnDisconnect()
    freefont(font)
end

public def OnReceiveRawPacket(data)
    for x = 0; x < 4; x++
        counter[x] = peekbyte(data,x)
    end
    role = peekbyte(data,4)
    freebank(data)
end

public def OnUpdate()

    width = getmonitorwidth()/45
    height = getmonitorheight()
    
    if role == 0 then        
        createtext(2.4,"SCPs Remaining: ", 0, 255, 0, 0)
        createtext(2.08,"Security Remaining: ", 1, 0, 0, 255)
        createtext(1.84,"Insurgents Remaining: ", 2, 0, 100, 0)
        createtext(1.65,"Dead Players: ", 3, 255, 255, 255)
    end
end