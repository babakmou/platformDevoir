const request = require('supertest');
const Etudiant = require('../../models/etudiant');

let server;

describe('/api/etudiants', () => {
    beforeEach(() => { server = require('../../bin/www'); });
    afterEach(async () => {
        server.close();
        await Etudiant.remove({});
    });

    describe('GET /', () => {
        it('faut retourner tous les etudiants', async () => {
            await Etudiant.collection.insertMany([
                {
                    nom: 'Gosling',
                    prenom: 'James',
                    courriel: 'james@sun.com',
                    motDePasse: '123456'
                }, {
                    nom: 'Eich',
                    prenom: 'Brendan',
                    courriel: 'brendan@eich.com',
                    motDePasse: '123456'
                }
            ]);

            const res = await request(server).get('/api/etudiants');
            expect(res.status).toBe(200);
            expect(res.body.length).toBe(2);
            expect(res.body.some(e => e.nom === 'Gosling')).toBeTruthy();
            expect(res.body.some(e => e.nom === 'Eich')).toBeTruthy();
        });
    });

    describe('GET /:id', () => {
        it('faut retourner un etudiant si un id valid est passe', async () => {
            const etudiant = new Etudiant({
                nom: 'Dorsey',
                prenom: 'Jack',
                courriel: 'jack@twt.com',
                motDePasse: '123456'
            });
            await etudiant.save();

            const res = await request(server).get('/api/etudiants/' + etudiant._id);

            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty('nom', etudiant.nom);
        });

        it('faut retourner 404 si id est invalide', async () => {

            const res = await request(server).get('/api/etudiants/1');

            expect(res.status).toBe(404);

        });

        it("faut retourner 404 si id n'est pas trouve", async () => {

            const res = await request(server).get('/api/etudiants/5f7402456b4f4e6dfa72a171');

            expect(res.status).toBe(404);

        });
    });
});