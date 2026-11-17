const jwt = require('jsonwebtoken');

const secret = process.env.SECRET_KEY;

const authorize = {

tokenAuthorize: async (req, res, next) =>  {
    try {
      const token = req.headers['authorization'];
    
      if (!token) {
        return res.status(401).json({ message: 'O token não foi encontrado na requisição' });
      }
    
      const bearerToken = token.split(' ')[1];
      
      jwt.verify(bearerToken, secret, (err, decoded) => {
        if (err) {
          return res.status(401).json({ message: 'O token está inválido.' });
        }
        req.userInfo = decoded;
      });

      next();
    } catch (e) {
      console.log("Erro na verificação do token de acesso:  ", e.message);
      return res.status(500).json({ message: 'Erro ao verificar o token.' });      
    }
  },

}
module.exports = authorize;