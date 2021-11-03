enum YEAR_EVENTS {
    BIRDTHDAY = '08/10',
    EXAM = '03/11',
    NEW_YEAR = '01/01',
    CHRISTMAS = '25/12',
    EASTER = 'easter',
    HALLOWEEN = '31/10',
    VALENTINE = '14/02',
    MOTHERS_DAY = 'mothersDay',
}

export function check_events() : YEAR_EVENTS[] {
    let events : YEAR_EVENTS[] = [];
    
    for (const event in YEAR_EVENTS) {

        //if today is the event date add it to the array
        const today = new Date();
        const eventDateArray = YEAR_EVENTS[event].split('/');

        if (today.getDate() == Number(eventDateArray[0]) && today.getMonth() + 1 == Number(eventDateArray[1])) {
            events.push(event as YEAR_EVENTS);
        }
        
    }
    console.log(events);
    return events;
}

export const current_events = check_events();