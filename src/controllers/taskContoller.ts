import Tasks from "../models/taskModel";

const taskController = {
    
    createTask: async (req: any, res: any) => {
        try {
            const { title, description, status, priority, dueDate } = req.body;
            const { id } = req.user;
             
            const dueDateUtc = new Date(dueDate);
            const now = new Date();

            if (dueDateUtc <= now) {
                return res.status(400).send({status: 400, message: "Due date must be in the future"});
            }

            const data = {
                title,
                description,
                status, 
                priority, 
                dueDate,
                userId: id
            }
            
            const saveTask = await new Tasks(data).save();
            if(saveTask){
                return res.status(201).send({status: 201, message: `${title} created successfully`});
            }

        } catch (error: any) {
            console.error(error);
            return res.status(500).send({status: 500, message: "Internal server error" });
        }
    },

    getTask: async (req: any, res: any) => {
        try {
            const { page, filter } = req.query;
            const { id } = req.user;

            let filterCondition: any= {};

            if (filter) {
                if(filter.hasOwnProperty("status")) {
                    filterCondition["status"] = filter.status;
                }
                if(filter.hasOwnProperty("priority")) {
                    filterCondition["priority"] = filter.priority;
                }
                if(filter.hasOwnProperty("dueDate")) {
                    const startOfDay = new Date(filter.dueDate);
                    startOfDay.setUTCHours(0, 0, 0, 0);

                    const endOfDay = new Date(filter.dueDate);
                    endOfDay.setUTCHours(23, 59, 59, 999);

                    filterCondition["dueDate"] = {$gte: startOfDay, $lte: endOfDay };
                }
            }

            const resPerPage = 10
            const records = await Tasks.find({ userId: id, isDeleted: false, ...filterCondition })
                    .sort({ _id: -1 })
                    .skip(resPerPage * page - resPerPage)
                    .limit(resPerPage);
            
            const totalRecord = await Tasks.countDocuments({ userId: id, isDeleted: false, ...filterCondition});
            const totalPages = Math.ceil(totalRecord / resPerPage);

            const pagination = {
                page,
                totalRecord,
                totalPages,
                limit: resPerPage,
            }

            return res.status(200).send({status: 200, message:"List", data: { records, pagination }});

        } catch (error: any) {
            console.error(error);
            return res.status(500).send({ status: 500, message: "Internal server error" });
        }
    },

    updateTask: async (req: any, res: any) => {
        try {
            const { taskId } = req.params;
            const { status, priority } = req.body;
            const { id } = req.user;

            const isUserAccess = await Tasks.findOne({userId: id, _id: taskId});
            if(!isUserAccess){
                return res.status(401).send({status: 401, message: "You don't have right access to update"});
            }

            const isTaskDeleted = await Tasks.findOne({_id: taskId, isDeleted: false});
            if(!isTaskDeleted){
                return res.status(401).send({status: 401, message: "Task Already Deleted"});
            }

            const data = {
                status: status || isTaskDeleted.status,
                priority: priority || isTaskDeleted.priority
            }
            
            const updateData = await Tasks.findOneAndUpdate({_id: taskId }, {$set: data}, {new: true, runValidators: true});
            if(!updateData){
                return res.status(500).send({ status: 500, message: "Something Went Wrong" });
            }

            return res.status(200).send({status: 201, message:"Task Updated Successfully"});

        } catch (error: any) {
            console.error(error);
            return res.status(500).send({ status: 500, message: "Internal server error" });
        }
    },

    deleteTask: async (req: any, res: any) => {
        try {
            const { taskId } = req.params;
            const { id } = req.user;
            
            const isUserAccess = await Tasks.findOne({userId: id, _id: taskId});
            if(!isUserAccess){
                return res.status(401).send({status: 401, message: "You don't have right access to delete"});
            }

            const isTaskDeleted = await Tasks.findOne({_id: taskId, isDeleted: false});
            if(!isTaskDeleted){
                return res.status(401).send({status: 401, message: "Task Already Deleted"});
            }

            const deleteData = await Tasks.findOneAndUpdate({_id: taskId }, {$set: {isDeleted: true}}, {new: true, runValidators: true});
            if(!deleteData){
                return res.status(500).send({ status: 500, message: "Something Went Wrong" });
            }

            return res.status(200).send({status: 201, message:"Task Deleted Successfully"});

        } catch (error: any) {
            console.error(error);
            return res.status(500).send({ status: 500, message: "Internal server error" });
        }
    }
}


export default taskController;
