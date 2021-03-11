export const title = 'Akrck02.com - Not found';

export const show = () => {

    document.body.style.padding = '50px';
    const title = document.createElement('h1');
    title.innerHTML = '404: Not found';
    title.classList.appendChild = 'h1';
    document.body.appendChild(title);

    const msg = document.createElement('p');
    msg.innerHTML = 'The page your searching for is no longer alive :(';
    document.body.appendChild(msg);
}