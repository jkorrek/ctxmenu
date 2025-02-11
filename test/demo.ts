import "../standalone/ctxmenu.d";

const ctxmenu = window.ctxmenu;
if ("") {
    ctxmenu.attach("body", [
        // @ts-expect-error
        {
            text: "",
            href: "",
            action: () => {/** */ },
            isDivider: false
        }
    ]);
}

document.addEventListener("readystatechange", function (event) {
    if (document.readyState === "complete") {

        ctxmenu.attach("html", [
            {
                text: "Actions",
                tooltip: "JS Functions"
            },
            {
                action: function () { alert("Clicked action item") },
                text: "click me"
            },
            { isDivider: true },
            {
                text: "Anchors",
                tooltip: "links (<a>)"
            },
            {
                href: "http://www.google.de",
                target: "_blank",
                text: "Google (new tab)",
                tooltip: "opens in new tab"
            },
            { isDivider: true },
            {
                text: "Tooltips",
                tooltip: "Tooltips are awesome"
            },
            {
                href: "",
                text: "Hover me!",
                tooltip: "Disabled items can also have a tooltip",
                disabled: true
            },
            { isDivider: true },
            {
                text: () => "Callbacks",
                tooltip: () => "Properties can also be defined by a tooltip"
            },
            {
                href: () => "",
                text: () => "Every property can be defined in a callback",
                tooltip: () => "Disabled items can also have a tooltip",
                disabled: () => true
            },
            {
                text: () => "Submenus can also be defined in a callback.",
                subMenu: () => [{
                    href: () => "",
                    text: () => "empty",
                    disabled: () => true
                }]
            },
            { isDivider: true },
            { text: "Custom Elements" },
            {
                html: '<select style="margin: 2px 20px"><option>Option1</option><option>Option2</option></select>',
                subMenu: []
            },
            {
                element: () => {
                    const image = document.createElement("img");
                    image.src = "favicon.png";
                    image.style.margin = "2px 20px";
                    image.style.height = "32px";
                    return image;
                },
                subMenu: []
            },
            { isDivider: true },
            { text: "Styling" },
            {
                text: "Items can be individually styled", style: "font-style: italic; font-weight: normal; text-decoration: underline; transform: skewY(1.5deg); transform-origin: left; color: #ee9900; letter-spacing: 2px; margin-bottom: 10px;",
                tooltip: "No need to provide a completely custom element"
            },
            { isDivider: true },
            {
                text: "Menuception"
            },
            {
                text: "more ...",
                subMenu: [
                    {
                        text: "even more...",
                        subMenu: [
                            {
                                text: "there's nothing here...",
                                action: undefined,
                                disabled: true
                            }
                        ]
                    }
                ]
            },
            {
                text: "even more actions",
                subMenu: [
                    // only for testing
                    // { text: "Spacer", icon: "favicon_nc.png" },
                    // { text: "Spacer", href: "", disabled: true, icon: "favicon_nc.png" },
                    // { text: "Spacer", href: "", disabled: true },
                    // { text: "Spacer", href: "", disabled: true, icon: "favicon_nc.png" },
                    // { text: "Spacer", href: "", disabled: true },
                    // { text: "Spacer", href: "", disabled: true },
                    // { text: "Spacer", href: "", disabled: true },
                    {
                        text: "more",
                        subMenu: menuception("what's\u2800this? deeper and deeper into the rabbit hole ... will it ever end? nobody knows ....... it is still going .... man, this is a deeply nested menu .... almost there .... I\u2800promise ... You did it ... Congrats!".split(" "))
                    }
                ]
            },
            { isDivider: true },
            { text: "Event specific stuff" }
        ], function (m, e) {
            m.push({
                text: "e.g. Cursor Position: X:" + e.clientX + " / Y:" + e.clientY,
                href: "",
                disabled: true
            });
            return m;
        });

        ctxmenu.attach("#header", []);
        ctxmenu.attach("header", []);
        ctxmenu.attach("[sidebarjs]", []);

        ctxmenu.attach(".download", [
            {
                text: "Downloads",
                subMenu: [
                    {
                        text: "ctxmenu.js",
                        href: "ctxmenu.js",
                        download: ""
                    },
                    {
                        text: "ctxmenu.min.js",
                        href: "ctxmenu.min.js",
                        download: ""
                    }
                ]
            },
            {
                text: "Documentation (github)",
                href: "https://www.github.com/nkappler/ctxmenu"
            }
        ]);
    }
});


function menuception(array) {
    if (array.length === 0) { return []; }

    return [{
        text: array.shift(),
        subMenu: menuception(array)
    }];
}

function toggleDarkMode() {
    const darkCss = document.querySelector("#darkTheme");
    const toggle = document.querySelector("#switch");
    if (darkCss) {
        document.head.removeChild(darkCss);
        toggle.innerHTML = "Fancy dark mode?";
    }
    else {
        const link = document.createElement("link");
        link.id = "darkTheme";
        link.rel = "stylesheet";
        link.type = "text/css";
        link.href = "./darkTheme.css";
        document.head.appendChild(link);
        toggle.innerHTML = "Back to normal!";
    }
}