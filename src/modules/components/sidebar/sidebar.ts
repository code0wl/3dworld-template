import { World } from "../world/world.class";

export class SideBar {
    public sidebarComponent: HTMLDivElement;

    private world: World;

    constructor(world, content) {
        this.world = world;
        if (!document.querySelector('.detailed-view')) {
            this.createSideBar(content);
        }
    }

    createSideBar(content) {
        this.sidebarComponent = document.createElement('div');
        const header = document.createElement('h4');
        const close = document.createElement('span');
        close.textContent = 'x';
        close.classList.add('close');
        header.textContent = content.name;
        this.sidebarComponent.appendChild(header);

        close.addEventListener('click', this.removeBar.bind(this));

        const agentList = document.createElement('ul');

        content.agents.forEach(agent => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<img src="${agent.picture}"> ${agent.name}`;
            listItem.classList.add('agent');
            agentList.appendChild(listItem);
        });

        this.sidebarComponent.appendChild(agentList);
        this.sidebarComponent.appendChild(close);

        this.sidebarComponent.classList.add('detailed-view');

        document.querySelector('main.world').appendChild(this.sidebarComponent);
    }

    removeBar() {
        this.sidebarComponent.blur();
        this.sidebarComponent.classList.add('animated', 'fadeOutLeft');
        setTimeout(() => document.querySelector('main.world').removeChild(this.sidebarComponent), 500);
        this.world.zoomOut();
    }

}