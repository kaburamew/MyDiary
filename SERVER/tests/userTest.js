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

const existingUser = {
  email: 'ww@gmail.com',
  password: 'qwerty123',
}

const NonExistingUser = {
  email: 'Nonww@gmail.com',
  password: 'qwerty123',
}

const UnMatchingUser = {
  email: 'ww@gmail.com',
  password: 'qwerty',
}

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
        res.body.status.should.be.equal(401);
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

  it('should be able to login', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(existingUser)
      .end((err, res) => {
        res.body.status.should.be.equal(200);
        res.body.message.should.be.equal('user successfully logged in');
      });
    done();
  });

  it('should not be able to login for non existing user', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(NonExistingUser)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('user does not exist');
      });
    done();
  });

  it('should not be able to login for non matching password', (done) => {
    chai.request(server)
      .post('/api/v1/auth/login')
      .send(UnMatchingUser)
      .end((err, res) => {
        res.body.status.should.be.equal(401);
        res.body.error.should.be.equal('email or password is incorrect');
      });
    done();
  });
});
