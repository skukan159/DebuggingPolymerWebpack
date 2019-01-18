const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="app-shell-base-style">

    <template>

        <custom-style>
           
        </custom-style>

    </template>

</dom-module>`;

document.head.appendChild($_documentContainer.content);
