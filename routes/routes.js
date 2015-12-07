var appRouter = function(app) {
	
	
	var accounts =[
				  {username:"admin",password:"admin"}
				  ];
	
	var response = {status:null,message:null};
	
	
	app.get("/",function(req,res){
		
		res.send("Hello Word");
		
	});
	
	app.get("/GetAllAccounts", function(req, res) {
			
			return res.send(accounts);
		
	});
	
	app.get("/account", function(req, res) {
		
		var username = req.query.username;
		var password = req.query.password;
	
		for(var a = 0; a< accounts.length;a++){
			
			if(username == accounts[a].username && password == accounts[a].password){
				return res.send(accounts[a]);
			}else if(!username && !password){
				response.status = "error";
				response.message = "missing username and/ or password";
				return res.send(response);
			}else{
				response.status = "error";
				response.message = "No username/password for that combination";
				return res.send(response);	
			}
			
		}
	});
	
	app.post("/account", function(req, res) {
		
		var username = req.body.username;
		var password = req.body.password;
		
		if(!username && !password){
			response.status = "error";
			response.message = "Account Creation error: missing username and/ or password";
			return res.send(response);
		}else{
			accounts.push({username:username,password:password});
			response.status = "Ok";
			response.message = "Account Created";
			return res.send(response); 
		}
		
	});



}
module.exports = appRouter;