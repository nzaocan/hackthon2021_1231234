var comments_template = `
<div style="margin-left:40px;margin-top:10px">
    <div class="a-row a-spacing-mini"><div class="a-profile" data-a-size="small"><div aria-hidden="true" class="a-profile-avatar-wrapper"><div class="a-profile-avatar">
    <img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png" data-src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"><noscript><img src="https://images-na.ssl-images-amazon.com/images/S/amazon-avatars-global/default._CR0,0,1024,1024_SX48_.png"/></noscript></div></div><div class="a-profile-content">
    <span class="a-profile-name">USER_NAME</span></div><div class="a-profile-content" style="padding-left:10px"><span class="a-color-secondary review-date">REVIEW_DATE</span></div>
        <a class="a-profile-content showNewCommentsDivButton" data-user="USER_NAME" data-link="REPLY_ID" style="padding-left:10px"><span>Reply</span></a>
    </div></div>

    <div>
        <a>AT_USER</a>
        <span> USERCOMMENTS</span>
    </div>
</div>
`;

const new_comments_template = `
<div style="margin-top:10px" id="NEW_COMMENTS_TEMPLATE_ID">
<div> YOUR COMMENTS</div>
<textarea rows="4" cols="50" style="margin:5px 0px">  </textarea>
<div class="cr-helpful-button aok-float-right addCommentsButton" data-link="COMMENTS_SUBMIT_ID">
<span class="a-button a-button-base">
<span class="a-button-inner">
<a class="a-button-text">
<div class="cr-helpful-text">Submit</div>
</a>
    </span>
    </span>
    </div>
<div class="cr-helpful-button aok-float-right hideCommentsButton">
<span class="a-button a-button-base">
<span class="a-button-inner">
<a class="a-button-text">
<div class="cr-helpful-text">Cancel</div>
</a>
</span>
</span>
</div></div>
`

const replay_button = `
<div class="cr-helpful-button aok-float-left hideCommentsButton" data-user="" data-link=""> 
<span class="a-button a-button-base">
<span class="a-button-inner">
<a class="a-button-text">
<div class="cr-helpful-text">Reply</div>
</a>
</span>
</span>
</div>
`

var user_count = 0;
var name_count=0;

console.log("start");

var name_list = ["Smith","Johnson","Williams","Brown","Jones","Garcia","Miller","Davis","Rodriguez","Martinez"];

var comments_list=[
    "after using it for a while, do you still think this item is worth?",
    "How much did you buy at that time?",
    "thank you.",
    "How about the express delivery speed?",
    "sounds good",
    "Is this suitable for kids",
    "thank you.",
    "How much did you buy at that time?",
    "How about the express delivery speed?",
    "thank you.",    
]

init();


function showNewCommentsDiv(){
    elmnt = this;
    console.log(elmnt)
    var id = elmnt.dataset.link;
    var e = document.getElementById(id);
    e.dataset.user = elmnt.dataset.user;
    e.style.display="block";
}

function createElementFromHTML(htmlString) {
    var div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild; 
}

function createComments(user_comments, parentId, comments_div_id, user_name, review_date, at_user){
    var pn = document.getElementById(parentId);

    console.log(user_comments,parentId,comments_div_id,user_name,review_date,at_user);

    // if (user_name===null) {
    //     user_name = name_list[name_count];
    //     name_count++;
    //     if (name_count>name_list.length) name_count = 0;
    // }


    user_name = "Myseft"
    if (review_date===null) review_date = "seconds ago";
    if(at_user===undefined) at_user = "";
    if (at_user!="") at_user = '@' + at_user;

    console.log(3);
    var st = comments_template.replace('REVIEW_DATE', review_date);
    st = st.replace('USER_NAME', user_name);
    st = st.replace('REPLY_ID', comments_div_id);
    st = st.replace('USERCOMMENTS', user_comments);
    st = st.replace('AT_USER', at_user);

    var e = createElementFromHTML(st);
    console.log(e);

    console.log(user_name,comments_div_id);

    let bt = e.querySelector('.showNewCommentsDivButton')
    bt.dataset.user=user_name;
    bt.dataset.link=comments_div_id;
    bt.onclick = showNewCommentsDiv;

    pn.appendChild(e);
    // pn.insertBefore(e, pn.children[pn.children.length-1]);
    // console.log(pn);
}

function hideComments(e){
    e.style.display = 'none';
}

function hideElemt(){
    document.getElementById(this.dataset.link).style.display = "none";
}

function addComments(){
    elmnt= this;
    var user_comments = elmnt.previousSibling.previousSibling.value;
    hideComments(elmnt.parentNode);
    var id = elmnt.dataset.link;
    var at_user = elmnt.parentNode.dataset.user;

    createComments(user_comments, id,  elmnt.parentNode.id,null, null, at_user);
}

function showComments(){
    elmnt = this;
    var id = elmnt.dataset.link;
    var e = document.getElementById(id);
    e.style.display="block";
}


function init(){
    // console.log(document);
    // return;

    var root = document.getElementsByClassName('cr-widget-FocalReviews')[0];
    var es = root.querySelectorAll('.review');

    let i=0;
    for (const e of es) {
        let st  = new_comments_template.replace("NEW_COMMENTS_TEMPLATE_ID", "NEW_COMMENTS_TEMPLATE_ID" + (user_count++).toString());

        let ee = createElementFromHTML(st);
        hideComments(ee);

        let bt = createElementFromHTML(replay_button);
        bt.dataset.link = ee.id;
        bt.dataset.user = "";
        bt.onclick = showNewCommentsDiv;
        e.firstChild.firstChild.lastChild.appendChild(bt);

        let reviewid=e.firstChild.firstChild.id;
        e.appendChild(ee);
        ee.querySelector('.addCommentsButton').dataset.link = reviewid;
        ee.querySelector('.addCommentsButton').onclick = addComments;
        ee.querySelector('.hideCommentsButton').dataset.link = ee.id;
        ee.querySelector('.hideCommentsButton').onclick = hideElemt;


        if (i==0){
            for(let j=0;j<4;j++){
                let st = comments_template.replace('REVIEW_DATE', (j+1).toString()+" months ago");
                st = st.replace('USER_NAME', name_list[j] );
                st = st.replace('REPLY_ID', reviewid);
                st = st.replace('USERCOMMENTS', comments_list[j]);
                st = st.replace('AT_USER', "");

                let elm = createElementFromHTML(st);
                let bt = elm.querySelector('.showNewCommentsDivButton')
                bt.dataset.user=name_list[j];
                bt.dataset.link=ee.id;
                bt.onclick = showNewCommentsDiv;
            
                e.firstChild.firstChild.lastChild.appendChild(elm);
            }

        }
        else if (i==1){
            for(let j=4;j<6;j++){
                let st = comments_template.replace('REVIEW_DATE', (j+1).toString()+" months ago");
                st = st.replace('USER_NAME', name_list[j] );
                st = st.replace('REPLY_ID', reviewid);
                st = st.replace('USERCOMMENTS', comments_list[j]);
                st = st.replace('AT_USER', "");

                let elm = createElementFromHTML(st);
                let bt = elm.querySelector('.showNewCommentsDivButton')
                bt.dataset.user=name_list[j];
                bt.dataset.link=ee.id;
                bt.onclick = showNewCommentsDiv;
            
                e.firstChild.firstChild.lastChild.appendChild(elm);
            }

        }
        else if(i==2){
            for(let j=7;j<8;j++){
                let st = comments_template.replace('REVIEW_DATE', (j+1).toString()+" months ago");
                st = st.replace('USER_NAME', name_list[j] );
                st = st.replace('REPLY_ID', reviewid);
                st = st.replace('USERCOMMENTS', comments_list[j]);
                st = st.replace('AT_USER', "");

                let elm = createElementFromHTML(st);
                let bt = elm.querySelector('.showNewCommentsDivButton')
                bt.dataset.user=name_list[j];
                bt.dataset.link=ee.id;
                bt.onclick = showNewCommentsDiv;
            
                e.firstChild.firstChild.lastChild.appendChild(elm);
            }
        }
        i++;
    }



    
}


document.addEventListener("DOMContentLoaded", function(event) {
    init();
});
