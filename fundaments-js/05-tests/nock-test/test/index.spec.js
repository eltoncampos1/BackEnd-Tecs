const expect = require('chai').expect;
const  getUserFollowers = require('../index').getUserFollowers;

describe('Get followers', () => {
    it('returns users follower', (done) => {
        this.timeout(3000);

        var username = 'octocat';

        getUserFollowers(username, (err, followers) => {
            expect(Array.isArray(followers)).to.equal(true);
            expect(followers).to.have.length.above(1);
            followers.forEach((follower) => {
                expect(follower).to.be.a('string');
            });
            done();
        });
    });
});