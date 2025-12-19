const cron = require("node-cron");
import Task from "../models/taskModel";
import db from "../config/db";

const functionCall = async () => {

    try{
        const startOfDayDate = new Date();
        startOfDayDate.setUTCDate(startOfDayDate.getUTCDate() + 1);

        const startOfDay = new Date(startOfDayDate);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(startOfDayDate);
        endOfDay.setUTCHours(23, 59, 59, 999);

        const taksDeadLineUser = await Task.aggregate([
            {
                $match: {
                    isDeleted: false,
                    status: {$in: ["Pending", "In-Progress"]},
                    dueDate: {
                        $gte: startOfDay,
                        $lte: endOfDay
                    }
                }
            },
            {
                $group: {
                    _id: "$userId"
                }
            }
        ]);

        const userIds = taksDeadLineUser.map(user => user._id);
        let users: any;

        if(userIds && userIds.length){
             users = await db("users").whereIn("id", userIds).select("id", "email", "userName");
        }

        if(users && users.length){
            users.map((rec: any)=>{
                //email logic comes here
                console.log(`To: ${rec.email} message: ${rec.userName} your task is nearing its due date.` );
            });
        }
        
    } catch (err: any){
        console.log("err", err);
    }
 
}

// code will run daily at 9AM IST
cron.schedule("0 0 9 * * *", () => {
    functionCall();
},{
    timezone: "Asia/Kolkata"
});