#PLAYERSCRIPT

//--Programmed in Skynet while playercounterv2.lua was programmed in Lua. Have to juggle between two languages
global counter = [4,SE_INT] //--Table to hold our counters
global font,role,width,height //--Empty variables to be filled

public def OnLaunchGame()
    font = loadfont("Courier New Rus.ttf",20) //--Font
    setfont(font)
end

def createtext(heightdiv,txt,index,r,g,b)
    color(r,g,b) //--Set Color of text. e.g. SCP is red, chaos is dark green
    text(width,height/heightdiv,txt + counter[index],0,0) //--Create Text
end

public def OnDisconnect()
    freefont(font) //--Delete font
end

public def OnReceiveRawPacket(data)
    for x = 0; x < 4; x++
        counter[x] = peekbyte(data,x) //--Extract counters from data
    end
    role = peekbyte(data,4) //--Extract role
end

public def OnUpdate() //--Every frame. We should spawn explosions!

    width = getmonitorwidth()/45
    height = getmonitorheight() //--Screen size
    
    if role != 0 then return//-- If spectator show text
    createtext(2.40,"SCPs Remaining: ", 0, 255, 0, 0) //--Red
    createtext(2.08,"Security Remaining: ", 1, 0, 0, 255) //--Blue
    createtext(1.84,"Insurgents Remaining: ", 2, 0, 100, 0) //--Green
    createtext(1.65,"Dead Players: ", 3, 255, 255, 255) //--White
    //--A for loop would be useful here if there was a dictonary or table feature in Skynet. 
end