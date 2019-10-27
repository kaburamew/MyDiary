import chai from 'chai';
import chaihttp from 'chai-http';
import server from '../server';

chai.use(chaihttp);
chai.should();

const user = {
  firstname: 'jack',
  lastname: 'fff',
  email: 'ww@gmail.com',
  password: 'qwerty123',
};

const wrongUser = {
  firstname: 'jack',
  lastname: 'f',
  email: 'ww@gmail.com',
  password: 'qwerty123',
};

describe('signup tests', () => {
  it('should be able to sign up', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(201);
        res.body.message.should.be.equal('User created successfully');
        res.body.data.should.have.property('firstname');
        res.body.data.should.have.property('lastname');
        res.body.data.should.have.property('email');
        res.body.data.should.have.property('password');
      });
    done();
  });
  it('should not be able to sign up for duplicate', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(user)
      .end((err, res) => {
        res.body.status.should.be.equal(403);
        res.body.error.should.be.equal('email already exist');
      });
    done();
  });

  it('should not be able to sign up for wrong inputs', (done) => {
    chai.request(server)
      .post('/api/v1/auth/signup')
      .send(wrongUser)
      .end((err, res) => {
        res.body.status.should.be.equal(400);
      });
    done();
  });
});
