/* eslint max-len: 0 */
const fs = require('fs-extra');
const path = require('path');
const ObjectId = require('mongodb').ObjectID;
const inquirer = require('inquirer');
module.exports = function(data) {
    return async() => {
        const db = data.db;
        const config = data.config;
        console.log('  └── Creating collection: pages...');
        try {
            await db.createCollection('pages');
        } catch (e) {
            console.log('      [ ] Collection is not created');
        }
        console.log('      Dropping indexes...');
        try {
            await db.collection('pages').dropIndexes();
        } catch (e) {
            console.log('      [ ] Indexes are not dropped');
        }
        console.log('      Creating indexes...');
        await db.collection('pages').createIndex({ folder: 1, name: 1, url: 1, status: 1 });
        await db.collection('pages').createIndex({ folder: -1, name: -1, url: -1, status: -1 });
        for (let lng in config.i18n.localeNames) {
            let idx = {};
            idx[lng + '.title'] = 1;
            await db.collection('pages').createIndex(idx);
            idx[lng + '.title'] = -1;
            await db.collection('pages').createIndex(idx);
        }
        let res = {};
        if (!data.options.force) {
            res = await inquirer.prompt([{
                type: 'list',
                name: 'continue',
                message: 'Do you wish to create default pages?\n',
                choices: [
                    'Yes, please',
                    'No'
                ]
            }]);
        }
        if (res.continue !== 'No' || data.options.force) {
            console.log('      Creating default pages...');
            let upd = await db.collection('pages').update({ _id: new ObjectId('59953847ffa00062b54c92ae') }, {
                $set: {
                    _id: ObjectId('59953847ffa00062b54c92ae'),
                    folder: '1',
                    name: '',
                    url: '',
                    en: {
                        title: 'Home page',
                        keywords: 'zoia, framework, node, mongo, cms',
                        description: 'Zoia is the Web Framework for rapid development',
                        content: '<h1>Welcome</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Installation has been successfully completed, the website is up and running.</p>'
                    },
                    status: '1',
                    ru: {
                        title: 'Главная страница',
                        keywords: 'zoia, framework, node, mongo, cms',
                        description: 'Zoia - веб-фреймворк для быстрой разработки',
                        content: '<h1>Добро пожаловать</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Инсталляция выполнена успешно, тестовый веб-сайт запущен.</p>'
                    }
                }
            }, { upsert: true });
            if (!upd || !upd.result || !upd.result.ok) {
                throw new Error('Could not run db.collection(\'pages\').update');
            }
            upd = await db.collection('pages').update({ _id: ObjectId('59953847ffa00062b54c92b0') }, {
                $set: {
                    _id: ObjectId('59953847ffa00062b54c92b0'),
                    folder: '1502985623',
                    name: 'installation',
                    url: 'manual/installation',
                    en: {
                        title: 'Installation',
                        keywords: '',
                        description: '',
                        content: '<h1>Installation</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>To install Zoia on your server or desktop, you will need the following&nbsp;prerequisites:</p>\n\n<ul>\n\t<li>Node.js version 7 and later</li>\n\t<li>MongoDB 3 and later</li>\n</ul>\n\n<p>Please follow the <a href="https://github.com/xtremespb/zoia/wiki/Installation" target="_blank">installation manual</a> for any further information.</p>\n\n<p>Default address for Zoia webserver is <a href=\'http://127.0.0.1:3000/\'>http://127.0.0.1:3000/</a>. You may also login to Administrator panel by opening the URL: <a href=\'http://127.0.0.1:3000/admin/\'>http://127.0.0.1:3000/admin/</a> (default username and password is admin/admin).</p>'
                    },
                    status: '1',
                    ru: {
                        title: 'Установка',
                        keywords: '',
                        description: '',
                        content: '<h1>Установка</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Перевод для данной страницы в настоящий момент отсутствует.</p>'
                    }
                }
            }, { upsert: true });
            if (!upd || !upd.result || !upd.result.ok) {
                throw new Error('Could not run db.collection(\'pages\').update');
            }
            upd = await db.collection('pages').update({ _id: ObjectId('59953847ffa00062b54c92b2') }, {
                $set: {
                    _id: ObjectId('59953847ffa00062b54c92b2'),
                    folder: '1502985623',
                    name: 'configuration',
                    url: 'manual/configuration',
                    en: {
                        title: 'Configuration',
                        keywords: '',
                        description: '',
                        content: '<h1>Configuration</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Configuration files are located in <strong>./etc</strong> folder. There are the following configuration files:</p>\n\n<ul>\n\t<li>config.js: main configuration file (database, host, port etc.)</li>\n\t<li>website.js: website configuration file (website title, templates, e-mail etc.)</li>\n</ul>\n\n<p>You will need to edit config.js in order to match your server/desktop configuration.</p>'
                    },
                    status: '1',
                    ru: {
                        title: 'Конфигурация',
                        keywords: '',
                        description: '',
                        content: '<h1>Конфигурация</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Перевод для данной страницы в настоящий момент отсутствует.</p>'
                    }
                }
            }, { upsert: true });
            if (!upd || !upd.result || !upd.result.ok) {
                throw new Error('Could not run db.collection(\'pages\').update');
            }
            upd = await db.collection('pages').update({ _id: ObjectId('59953847ffa00062b54c92b4') }, {
                $set: {
                    _id: ObjectId('59953847ffa00062b54c92b4'),
                    folder: '1',
                    name: 'support',
                    url: 'support',
                    en: {
                        title: 'Support',
                        keywords: '',
                        description: '',
                        content: '<h1>Support</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>You are welcome to create issues and pull requests on <a href=\'https://github.com/xtremespb/zoia\'>Github</a> page.</p>'
                    },
                    status: '1',
                    ru: {
                        title: 'Поддержка',
                        keywords: '',
                        description: '',
                        content: '<p>Вы можете создавать тикеты и pull request&#39;ы на странице в&nbsp;<a href=\'https://github.com/xtremespb/zoia\'>Github</a>.</p>'
                    }
                }
            }, { upsert: true });
            if (!upd || !upd.result || !upd.result.ok) {
                throw new Error('Could not run db.collection(\'pages\').update');
            }
            upd = await db.collection('pages').update({ _id: ObjectId('5995685cffa00062b54cb2c0') }, {
                $set: {
                    _id: ObjectId('5995685cffa00062b54cb2c0'),
                    folder: '1502985623',
                    name: '',
                    en: {
                        title: 'Manual',
                        keywords: '',
                        description: '',
                        content: '<h1>Manual</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>The following documentation is currently available:</p>\n\n<ul>\n\t<li><a href=\'/manual/installation\'>Installation</a></li>\n\t<li><a href=\'/manual/configuration\'>Configuration</a></li>\n</ul>'
                    },
                    url: 'manual',
                    status: '1',
                    ru: {
                        title: 'Руководство',
                        keywords: '',
                        description: '',
                        content: '<h1>Руководство</h1>\n\n<p>[[data|locale|breadcrumbs]]</p>\n\n<p>Доступна следующая документация:</p>\n\n<ul>\n\t<li><a href=\'/manual/installation\'>Установка</a></li>\n\t<li><a href=\'/manual/configuration\'>Конфигурация</a></li>\n</ul>'
                    }
                }
            }, { upsert: true });
            if (!upd || !upd.result || !upd.result.ok) {
                throw new Error('Could not run db.collection(\'pages\').update');
            }
        }
        upd = await db.collection('registry').update({ name: 'pagesFolders' }, {
            $set: {
                name: 'pagesFolders',
                data: '[{\"id\":\"1\",\"text\":\"/\",\"parent\":\"#\",\"type\":\"root\"},{\"id\":\"1502985623\",\"text\":\"manual\",\"data\":{\"lang\":{\"en\":\"Manual\",\"ru\":\"Руководство\"}},\"parent\":\"1\",\"type\":\"folder\"}]'
            }
        }, { upsert: true });
        if (!upd || !upd.result || !upd.result.ok) {
            throw new Error('Could not run db.collection(\'registry\').update');
        }
        console.log('      Creating storage directory...');
        try {
            await fs.mkdir(path.join(__dirname, 'static', 'storage'));
        } catch (e) {
            console.log('      [!] Not created. Already exists?');
        }
        console.log('      Module is installed!');
    };
};