export const title = 'Akrck02.com - welcome';

export const show = () => {
    window.title = title;
    document.title = title;
    
    document.body.style.padding = '50px';
    const title_e = document.createElement('h1');
    title_e.innerHTML = 'Akrck02.com';
    title_e.classList.appendChild = 'h1';
    document.body.appendChild(title_e);
    
    const msg = document.createElement('p');
    msg.className = 'code_paragraph';
    msg.innerHTML = 'This website will be open soon! :)';
    document.body.appendChild(msg);
}

