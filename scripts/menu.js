'use strict';
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MenuSchema = new Schema({
    path: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    type: {
        type: String,
        required: false,
        trim: true
    },
    icontype: {
        type: String,
        required: false,
        trim: true
    },
    collapse: {
        type: String,
        required: false,
        trim: true
    },
    ab: {
        type: String,
        required: false,
        trim: true
    },
    parent: {
        type: Schema.Types.ObjectId,
        ref: "Menu",
        required: false
    },
    roles: [{
        type: String,
        ref: 'Role',
        required: false
    }]
});

MenuSchema.index({ path: 1 }, { unique: true });

let Menu = module.exports = mongoose.model("Menu", MenuSchema);


let createMenu = async (menu) => Menu.create(menu);
let createChildrens = async (parent, childrens) => {
    for (let m of childrens) {
        m.parent = parent._id;
        await createMenu(m);
    }
};


let createMenuItems = async () => {

    await Menu.deleteMany({});

    let parent = {};

    //******dashboard*******//

    parent = await createMenu({
        path: '/dashboard',
        title: 'Dashboard',
        type: 'link',
        icontype: 'dashboard',
        roles: ['SUPERADMIN', 'ADMIN', 'USER']
    });

    //*****invoicing*****//
    parent = await createMenu({
        path: '/invoicing',
        title: 'Facturacion',
        type: 'sub',
        icontype: 'store',
        collapse: 'invoicing',
        roles: ['SUPERADMIN', 'ADMIN', 'USER']
    });

    let invoicing =
        [
            { path: 'product', title: 'Productos', ab: 'PR', roles: ['SUPERADMIN', 'ADMIN'] },
            { path: 'customer', title: 'Clientes', ab: 'CL', roles: ['SUPERADMIN', 'ADMIN'] },
            { path: 'establishment', title: 'Establecimientos', ab: 'ES', roles: ['SUPERADMIN', 'ADMIN'] },
            { path: 'invoice', title: 'Facturas', ab: 'FA', roles: ['SUPERADMIN', 'ADMIN', 'USER'] },
            { path: 'user', title: 'Usuarios', ab: 'US', roles: ['SUPERADMIN', 'ADMIN'] },
            { path: 'query-invoice', title: 'Consulta Facturas', ab: 'CF', roles: ['SUPERADMIN', 'ADMIN'] }
        ];

    await createChildrens(parent, invoicing);

    //*****components*****//

    /*  parent = await createMenu({
          path: '/components',
          title: 'Components',
          type: 'sub',
          icontype: 'apps',
          collapse: 'components',
          roles: ['SUPERADMIN']
      });*/


    let components = [
        { path: 'buttons', title: 'Buttons', ab: 'B', roles: ['SUPERADMIN'] },
        { path: 'grid', title: 'Grid System', ab: 'GS', roles: ['SUPERADMIN'] },
        { path: 'panels', title: 'Panels', ab: 'P', roles: ['SUPERADMIN'] },
        { path: 'sweet-alert', title: 'Sweet Alert', ab: 'SA', roles: ['SUPERADMIN'] },
        { path: 'notifications', title: 'Notifications', ab: 'N', roles: ['SUPERADMIN'] },
        { path: 'icons', title: 'Icons', ab: 'I', roles: ['SUPERADMIN'] },
        { path: 'typography', title: 'Typography', ab: 'T', roles: ['SUPERADMIN'] }
    ];

    //  await createChildrens(parent, components);

    //*****forms*****//

    /*parent = await createMenu({
        path: '/forms',
        title: 'Forms',
        type: 'sub',
        icontype: 'content_paste',
        collapse: 'forms',
        roles: ['SUPERADMIN']
    });*/

    let forms =
        [
            { path: 'regular-forms', title: 'Regular Forms', ab: 'RF', roles: ['SUPERADMIN'] },
            { path: 'extended-forms', title: 'Extended Forms', ab: 'EF', roles: ['SUPERADMIN'] },
            { path: 'validation', title: 'Validation Forms', ab: 'VF', roles: ['SUPERADMIN'] },
            { path: 'wizard', title: 'Wizard', ab: 'W', roles: ['SUPERADMIN'] }
        ];


    //  await createChildrens(parent, forms);



    //*****tables*****//

    /* parent = await createMenu({
         path: '/tables',
         title: 'Tables',
         type: 'sub',
         icontype: 'grid_on',
         collapse: 'tables',
         roles: ['SUPERADMIN']
     });*/

    let tables = [
        { path: 'regular-tables', title: 'Regular Tables', ab: 'RT', roles: ['SUPERADMIN'] },
        { path: 'extended-tables', title: 'Extended Tables', ab: 'ET', roles: ['SUPERADMIN'] },
        { path: 'datatables.net', title: 'Datatables.net', ab: 'DT', roles: ['SUPERADMIN'] }
    ];

    // await createChildrens(parent, tables);


    //*****maps*****//

    /*parent = await createMenu({
        path: '/maps',
        title: 'Maps',
        type: 'sub',
        icontype: 'place',
        collapse: 'maps',
        roles: ['SUPERADMIN']
    });*/

    let maps = [
        { path: 'google', title: 'Google Maps', ab: 'GM', roles: ['SUPERADMIN'] },
        { path: 'fullscreen', title: 'Full Screen Map', ab: 'FSM', roles: ['SUPERADMIN'] },
        { path: 'vector', title: 'Vector Map', ab: 'VM', roles: ['SUPERADMIN'] }
    ]


    // await createChildrens(parent, maps);


    //*****widgets*****//

    /*  await createMenu({
          path: '/widgets',
          title: 'Widgets',
          type: 'link',
          icontype: 'widgets',
          roles: ['SUPERADMIN']
      });*/


    //*****charts*****//

    /* await createMenu({
         path: '/charts',
         title: 'Charts',
         type: 'link',
         icontype: 'timeline',
         roles: ['SUPERADMIN']
     });*/

    //*****calendar*****//

    /*await createMenu({
        path: '/calendar',
        title: 'Calendar',
        type: 'link',
        icontype: 'date_range',
        roles: ['SUPERADMIN']
    });*/


    //*****pages*****//

    /*await createMenu({
        path: '/pages',
        title: 'Pages',
        type: 'sub',
        icontype: 'image',
        collapse: 'pages',
        roles: ['SUPERADMIN']
    });*/


    let pages = [
        { path: 'pricing', title: 'Pricing', ab: 'P', roles: ['SUPERADMIN'] },
        { path: 'timeline', title: 'Timeline Page', ab: 'TP', roles: ['SUPERADMIN'] },
        { path: 'login', title: 'Login Page', ab: 'LP', roles: ['SUPERADMIN'] },
        { path: 'register', title: 'Register Page', ab: 'RP', roles: ['SUPERADMIN'] },
        { path: 'lock', title: 'Lock Screen Page', ab: 'LSP', roles: ['SUPERADMIN'] },
        { path: 'user-page', title: 'User Page', ab: 'UP', roles: ['SUPERADMIN'] }
    ]

    // await createChildrens(parent, pages);

}



module.exports.createMenuItems = createMenuItems;
