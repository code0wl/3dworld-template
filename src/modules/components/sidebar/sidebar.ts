export class SideBar {
    public isOpen: boolean;
    public sidebarComponent: HTMLDivElement;

    constructor(content) {

        const sidebarComponent = document.createElement('div');
        const header = document.createElement('h4');
        header.textContent = content.name;
        sidebarComponent.appendChild(header);

        const agentList = document.createElement('ul');

        content.agents.forEach(agent => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${agent.picture}"> ${agent.name}`;
            listItem.classList.add('agent');
            agentList.appendChild(listItem);
        });

        sidebarComponent.appendChild(agentList);

        sidebarComponent.classList.add('detailed-view');

        document.querySelector('main.world').appendChild(sidebarComponent);
    }

}