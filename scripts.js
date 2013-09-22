$(document).ready(function() {
    Parse.initialize("0XzvdlgqOu7EmIG56s1UHxPSNptEzTQBmDearxyQ", "ajrKgWH8DxTqOAmzcSR9WW50lD0Et9QA7tqpOWmC");
	


    var submissions = 0
    var deleteButtonHTML = '<img class="delete" src="http://b.dryicons.com/images/icon_sets/shine_icon_set/png/128x128/delete.png">'


    var user = Parse.User.current();

    console.log(user);

    if (user === 'null') {
        window.location.replace("http://www.google.com")
    }


    var Favor = Parse.Object.extend("Favor");

    var query = new Parse.Query("Favor");
    query.equalTo("user", user);
    query.find({
        success: function(results) {
            for (var i=0; i<results.length; i++) {
                var object = results[i];
                console.log(object.id)

                var favorClient = {
                    debtor: object.get('debtor'),
                    creditor: object.get('creditor'),
                    story: object.get('story'),
                    date: object.get('date'),
                    status: object.get('status'),
                    id: object.id,
                    deleteButton: deleteButtonHTML
                }

                console.log(favorClient.debtor+" owes "+favorClient.creditor+" because he or she "+favorClient.story+" on "+favorClient.date+". But as of now, "+favorClient.status);

                
                if (submissions == 0) {

                    
                    $("#row2cell1text").replaceWith(favorClient.debtor);
                    $("#row2cell2text").replaceWith(favorClient.creditor);
                    $("#row2cell3text").replaceWith(favorClient.story);
                    $("#row2cell4text").replaceWith(favorClient.date);
                    $("#row2cell5text").replaceWith(favorClient.status);
                    $("#row2cell6text").replaceWith(favorClient.id);
                    $("#row2cell7text").replaceWith(favorClient.deleteButton)

                    $("#row2cell1").parent().attr("id", favorClient.id);
                    console.log($("#row2cell1").parent().attr("id"));
                    submissions=submissions+1
                    console.log("Submissions = "+submissions)

                }
 
                else {
                    var holder = '<tr id="placeHolder">';
                    for (key in favorClient) {
                        holder+='<td class="tableCell">'+favorClient[key]+'</td>';
                    }
                    holder+='</tr>';
                    console.log(favorClient.id);

                    $("#table").append(holder);
                    $("#placeHolder").attr("id", favorClient.id);

                    console.log(holder)
                
                    submissions = submissions+1;
                    console.log("Submissions = "+submissions);

                }

                }

        $("td").click(function() {
            var oldText = $(this).text()
            console.log(oldText)
            $(this).attr("contenteditable", "true")
            $(this).on("focusout", function() {
                $(this).attr("contenteditable", "false")
                var newText = $(this).text();
                console.log(newText);
                var favorID = $(this).parent().attr("id");
                console.log(favorID);

                var cell = $(this).closest('td');
                var cellIndex = cell[0].cellIndex;

                console.log(cellIndex);
        
                query.get(favorID, {
                    success: function(object) {
                        switch (cellIndex)
                        {
                            
                            case 0:
                                object.set("debtor", newText);
                                break;
                            case 1:
                                object.set("creditor", newText);
                                break;
                            case 2:
                                object.set("story", newText);
                                break;
                            case 3:
                                object.set("date", newText);
                                break;
                            case 4:
                                object.set("status", newText);
                                break;
                            case 5:
                                object.set("id", newText);
                                break;

                        }

                        object.save();
                    }, 
                    error: function(object, error) {}
                });
            });
        });
        

        $('.delete').click(function() {
            console.log("You clicked!")
            var favorID = $(this).parent().parent().attr("id")
            console.log("Going to try to delete "+favorID)
            $(this).parent().parent().remove();
            console.log("Success!")
            query.get(favorID, {
                success: function(object) {
                    object.destroy({
                        
                        success: function(object) {
                            // The object was deleted from the Parse Cloud.
                        },
                        
                        error: function(object, error) {
                            // The delete failed.
                            // error is a Parse.Error with an error code and description.
                        }
                    });
                },

                error: function(object, error) {
                            // The delete failed.
                            // error is a Parse.Error with an error code and description.
            }


            });
 
        });



        },


        
        error: function(error) {
            console.log("Error: "+error.code+" "+error.message);
        }
    });


    $('#submitButton').click(function() {
        var favorDB = new Favor();
        favorDB.save({ 

            debtor: $('#favorDebtor').val(),
            creditor: $('#favorCreditor').val(),
            story: $('#story').val(),
            date: $('#date').val(),
            status: $('#status').val(),
            user: user
        })

        var favorClient = {
            debtor: $('#favorDebtor').val(),
            creditor: $('#favorCreditor').val(),
            story: $('#story').val(),
            date: $('#date').val(),
            status: $('#status').val(),
            id: favorDB.id,
            deleteButton: deleteButtonHTML
        }

        
        console.log(favorClient.debtor+" owes "+favorClient.creditor+" because he or she "+favorClient.story+" on "+favorClient.date+". But as of now, "+favorClient.status);

        if (submissions == 0) {

            $("#row2cell1text").replaceWith(favorClient.debtor)
            $("#row2cell2text").replaceWith(favorClient.creditor)
            $("#row2cell3text").replaceWith(favorClient.story)
            $("#row2cell4text").replaceWith(favorClient.date)
            $("#row2cell5text").replaceWith(favorClient.status)
            $("#row2cell6text").replaceWith(favorClient.identifier)
            $("#row2cell7text").replaceWith(favorClient.deleteButton)
            
            submissions = submissions+1
            console.log("Submissions = "+submissions)

            $("#row2cell1").parent().attr("id", favorClient.id);
            console.log($("#row2cell1").parent().attr("id"));

        }

        else {
            var holder = '<tr id="placeHolder">';
            for (key in favorClient) {
                holder += '<td>'+favorClient[key]+'</td>';
            }
            holder += '</tr>';
            $("#placeHolder").attr("id", favorClient.id);
            $("#table").append(holder);

            submissions = submissions+1
            console.log("Submissions = "+submissions)


        }

    });


    


});