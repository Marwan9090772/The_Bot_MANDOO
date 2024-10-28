let handler = m => m; 

handler.all = async function (m) { 
    let chat = global.db.data.chats[m.chat]; 
    let responses; 
    
    if (/^تست$/i.test(m.text)) { 
        responses = [ '*شغال يعمري*' ]; 
    } else if (/^السلام عليكم|سلام عليكم ورحمه الله وبركاته|سلام عليكم|السلام عليكم ورحمه الله وبركاته$/i.test(m.text)) { 
        responses = [ '*🧚🏼‍♂️وعليكم السلام*' ]; 
    } else if (/^ماندو|ماندو$/i.test(m.text)) { 
        responses = [ '*قلب ماندو*', '*معاك*', '*اي يعمري*', '*قليو*' ]; 
    } else if (/^ماندو مين عمك|ماندو عمك$/i.test(m.text)) { 
        responses = [ '*ماندو اكيد*' ]; 
    } else if (/^بوت انت مرتبط$/i.test(m.text)) { 
        responses = [ '*كسم الارتباط*' ]; 
    } else if (/^ماندو بتحبني|بوت بتحبني$/i.test(m.text)) { 
        responses = [ '*لا*', '*هو انتا/انتي حد بيطيقك*', '*بس يعسل*' ]; 
    } else if (/^سفروت تكرهني\?$/i.test(m.text)) { 
        responses = [ '*ماعاش من يكرهكك حبي 🙁*', '*لا بس لا تتعب نفسك لحبك🫥*', '*ااي اكرهك🙄*' ]; 
    } else if (/^هاي|هالو$/i.test(m.text)) { 
        responses = [ '*منور🌚♥*' ]; 
    } else if (/^بحبك/i.test(m.text)) { 
        responses = [ '*بحبك اكتر🌚❤*', '*ونا كمان بحبني🦦🤍*', '*ونا كمان يحته😹🤍*' ]; 
    } else if (/^عيب$/i.test(m.text)) { 
        responses = [ '*حصل عيب*' ]; 
    } else if (/^احبك$/i.test(m.text)) { 
        responses = [ '*مـي تو 🙂🫀*' ]; 
    } else if (/^اوك|اوكي|اوككي|اوكيي|اوكك$/i.test(m.text)) { 
        responses = [ '*اوك*' ]; 
    } else if (/^تحبني$/i.test(m.text)) { 
        responses = [ '🌚♥اكيد' ]; 
    } else if (/^اهلا$/i.test(m.text)) { 
        responses = [ '*اهلا♥*' ]; 
    } else if (/^مساء الخير$/i.test(m.text)) { 
        responses = [ 'مساء الخير' ]; 
    } else if (/^صباح الخير$/i.test(m.text)) { 
        responses = [ '*صباح الورد🧚🏼‍♂️*', '*صباح الفل🧚🏼‍♂️*', '*صباح العسل🧚🏼‍♂️*', '*احلي صباح🧚🏼‍♂️*' ]; 
    } else if (/^اوامر$/i.test(m.text)) { 
        responses = [ '*لا تنسى ال .*' ]; 
    } else if (/^بوت$/i.test(m.text)) { 
        responses = [ '*اسمي ماندو يسطا*', '*اسمي ماندو*' ]; 
    } else if (/^حد صاحي$/i.test(m.text)) { 
        responses = [ '*انا😹*' ]; 
    }
    
    if (responses) { 
        let randomIndex = Math.floor(Math.random() * responses.length); 
        conn.reply(m.chat, responses[randomIndex], m); 
    }
    
    return true; 
}; 

export default handler;
