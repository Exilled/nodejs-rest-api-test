var appRouter = function(app) {
	
	
	var accounts =[
				  {username:"admin",password:"admin",admin:true}
				  ];
	
	var response = {status:null,message:null,data:null};
	
	
	app.all('*', function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
		next();
	});
	
	app.get("/",function(req,res){
		
		res.send("Hello Word");
		
	});
	
	app.get("/GetAllAccounts", function(req, res) {
			
			return res.send(accounts);
		
	});
	
	app.post("/account", function(req, res) {
		
		var username = req.body.username;
		var password = req.body.password;
		
		//SEES IF USERNAME OR PASSWORD ARE EMPTY
		if(username == null && password == null){
				response.status = "error";
				response.message = "missing username and/ or password";
				response.data = null;
				return res.send(response);
		}
		
		//SEARCHS FOR GIVEN USERNAME/PASSWORD
		for(var a = 0; a< accounts.length;a++){
			if(username == accounts[a].username && password == accounts[a].password){
				
				console.log("user"+ username+" logged in");
				
				response.status = "Ok";
				response.message = null;
				response.data = accounts[a];
				return res.send(response);
			}
		}
		
		//IF NOT FOUND REPONDS WITH ERROR
		response.status = "error";
		response.message = "No username/password for that combination";
		response.data = null;
		return res.send(response);	
		
	});
	
	app.post("/accountCreate", function(req, res) {
		
		var username = req.body.username;
		var password = req.body.password;
		
		if(!username && !password){
			response.status = "error";
			response.message = "Account Creation error: missing username and/ or password";
			response.data = null;
			return res.send(response);
		}else{
			
			console.log("user"+ username +" created");
			
			accounts.push({username:username,password:password});
			response.status = "Ok";
			response.message = "Account Created";
			response.data = null;
			return res.send(response); 
		}
		
	});



}
module.exports = appRouter;