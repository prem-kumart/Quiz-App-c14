
const alphabetOptions = ['A','B','C','D']

const subjectContainer = document.querySelector('.subject-list')
const quizWelcomeSection = document.querySelector('.quiz-select')
const questionSection =  document.querySelector('.question-section')


const welcomeContainerEl =  document.querySelector('.welcome-container');
const mainHeading = document.querySelector('.main-heading');
const mainParagraph  = document.querySelector('.main-paragraph');

const finalScoreSection = document.querySelector('.final-result-section')

const questionSubjectHeader = document.querySelector('.quiz-subject');
const subjectIconheader =  document.createElement('img');
const subjectTitleheader = document.createElement('h2');


subjectIconheader.classList.add('subject-icon')
subjectTitleheader.classList.add('subject-name','small-heading')
subjectIconheader.alt = 'subject selected icon in header';

//////////////////////

const progressDiv =  document.createElement('div');
progressDiv.classList.add('progress-bar');


//////////////////////

const correctIconEl = document.createElement('img')
correctIconEl.src= 'assets/images/icon-correct.svg'
correctIconEl.alt = 'correct icon'
correctIconEl.classList.add('answer-validity-icon')

const inCorrectIconEl = document.createElement('img')
inCorrectIconEl.src= 'assets/images/icon-incorrect.svg'
inCorrectIconEl.alt = 'Incorrect icon'
inCorrectIconEl.classList.add('answer-validity-icon')

/////////////////
/////////////////

//Error Message for not selecting the an option
const errorMessageContainer =  document.createElement('div');
errorMessageContainer.classList.add('error-container');

const errorIconEl =  document.createElement('img');
errorIconEl.src = 'assets/images/icon-error.svg'
errorIconEl.alt = 'Error Icon';

const errorMessage = document.createElement('p');
errorMessage.textContent = 'Please select an answer'

errorMessageContainer.append(errorIconEl);
errorMessageContainer.append(errorMessage);


////////////////////


/* Final Score Section Contents */
const finalScoreImgIcon =  document.querySelector('.score-subject-icon');
const finalScoreSubject = document.querySelector('.subject-scored');
const finalScoreEl  = document.querySelector('.score')
const socreOutOfEl =  document.querySelector('.score-out-of');
const btnPlayAgain = document.querySelector('.btn-play-again')


///////////////////

const modeIconSun = document.querySelector('.mode-icon-sun');
const modeIconMoon= document.querySelector('.mode-icon-moon');

const darkModeEnable = function(){
    
  
    document.body.classList.add('darkmode')
    modeIconMoon.src = "assets/images/icon-moon-light.svg";
    modeIconSun.src = "assets/images/icon-sun-light.svg";

}

const lightModeEnable = function(){

    document.body.classList.remove('darkmode')
    modeIconMoon.src = "assets/images/icon-moon-dark.svg";
    modeIconSun.src = "assets/images/icon-sun-dark.svg";
}



const modeToggle =  document.querySelector('#dark-light-toggle');
modeToggle.focus()
modeToggle.setAttribute('tabindex', 0);

['click','keypress'].forEach((event)=>{
    modeToggle.addEventListener(event,(e)=>{

    if(event ==='keypress' && e.key != 'Enter'){
        return;
    }
      if(e.target.checked){
          darkModeEnable()
      }
      else {
         lightModeEnable()
      }
}) // Inner for loop 

});//Outer for loop 

//////////////////

//Removing the question section in Welcome page
questionSection.classList.remove('question-section-active')






//slider Linear Gradient Progress
const sliderProgessColor =  function(questionNo,NoOfQuestions) {
    
    const progress = (questionNo / NoOfQuestions) * 100;

    progressDiv.style.background = `linear-gradient(to right, #A729F5 ${progress}% , #FFFFFF ${progress}%)`
    
}



// Render Subjects  in Welcome Page 
function renderSubjects(quizData){
  return new Promise((resolve,reject)=>{

    mainHeading.innerHTML = `Welcome to the <br><strong>Frontend Quiz!</strong>`;
    mainParagraph.style.display = 'block';
    mainParagraph.textContent = 'Pick a subject to get started.'
    welcomeContainerEl.classList.add('welcome-container-active');
    quizWelcomeSection.classList.add('quiz-select-active');

    for(let i in quizData){
   
        for( let j in quizData[i]){

            //console.log(quizData[i][j].title)
            const subjectEl =  document.createElement('div'); //container
            const subjectIcon = document.createElement('img'); //Icon element
            const subjectTitle = document.createElement('h2');// Subject Title
            subjectEl.classList.add('subject');
            subjectEl.setAttribute('tabindex',0);

            //Setting Image Properties
            subjectIcon.src = `${quizData[i][j].icon}`;
            subjectIcon.alt =  `${quizData[i][j].title} Icon`;
            subjectIcon.classList.add('subject-icon')
            //console.log(subjectIcon)
            
            //Setting the subject Title
            subjectTitle.classList.add('subject-name');
            subjectTitle.textContent = `${quizData[i][j].title}`;
            //console.log(subjectTitle)

            subjectEl.appendChild(subjectIcon);
            subjectEl.appendChild(subjectTitle);
            subjectContainer.appendChild(subjectEl)
            
        };

        ['keypress','click'].forEach((event)=>{
        [...subjectContainer.children].forEach(subelem => subelem.addEventListener(event,(e)=>{

                    if(event ==='keypress' && e.key != 'Enter'){
                            return;
                    }

                  //console.log([...e.currentTarget.children][1].textContent)
                  const subjectSelected =  [...e.currentTarget.children][1].textContent
                  for(let i in quizData)
                   {
                     for(let j in quizData[i]){
                        if (quizData[i][j].title === subjectSelected ){
                            resolve([quizData[i][j].questions,quizData[i][j].icon,quizData[i][j].title])
                        }
                     }
                   }

             
                 
        })) // Inner forEach End.

        }) //Outer ForEach End.
        
    }


});
}




//Render Each Question 
function renderQuestionHTML(questionNumber,NumOfQuestions,question,optionsListArray,answer){
   return new Promise((resolve,reject)=>{
    //console.log(questionNumber,question,options)

    // Part One.
    const questionSectionPartOne = document.createElement('div')
    questionSectionPartOne.classList.add('question-section-part-one')

    /* Question Number---Part-One-*/ 
    const questionNumberEl =  document.createElement('p');
    questionNumberEl.classList.add("question-number")
    questionNumberEl.textContent = `Question ${questionNumber}  of ${NumOfQuestions}`
    questionSectionPartOne.appendChild(questionNumberEl)

    /* Question---Part-One--*/
    const questionEl = document.createElement('h2');
    questionEl.classList.add('question')
    questionEl.textContent = `${question}`
    questionSectionPartOne.appendChild(questionEl);

  
    /* Progress-Bar--Part-One--*/
    questionSectionPartOne.appendChild(progressDiv)


    questionSection.appendChild(questionSectionPartOne);
 
    /*-------------------------*/
    // part Two.
    const questionSectionPartTwo = document.createElement('div')
    questionSectionPartTwo.classList.add('question-section-part-two')


    /* Options--Part-Two-*/
    const optionsContainer = document.createElement('div');
    optionsContainer.classList.add('options')
    questionSectionPartTwo.appendChild(optionsContainer)
   

    /* Submit and Next buttons---Part-Two-*/
    const buttonContainerEl = document.createElement('div')
    buttonContainerEl.classList.add('button-container')

    const buttonSubmitAnswer = document.createElement('button');
    buttonSubmitAnswer.textContent = "Submit Answer"
    buttonSubmitAnswer.classList.add('btn','submit-answer','submit-answer-active')
    buttonContainerEl.append(buttonSubmitAnswer)
  

    const buttonNextQuestion = document.createElement('button');  
    buttonNextQuestion.textContent = 'Next Question'   
    buttonNextQuestion.classList.add('btn','next-question'); 
    buttonContainerEl.append(buttonNextQuestion)  
    
    questionSectionPartTwo.append(buttonContainerEl);
    questionSectionPartTwo.append(errorMessageContainer)

    questionSection.appendChild(questionSectionPartTwo);

    for(let i in optionsListArray){
        
        //Container for each options
        const eachOptionContainer =  document.createElement('div');
        eachOptionContainer.classList.add('option-container');
        optionsContainer.appendChild(eachOptionContainer);

        eachOptionContainer.setAttribute('tabindex', 0);
        //Adding the option Number 
        const optionNumber = document.createElement('h2');
        optionNumber.classList.add('option-number','small-heading')
        optionNumber.textContent =`${alphabetOptions[i]}`
        eachOptionContainer.appendChild(optionNumber)

        //Adding the option Content
        const optionContent = document.createElement('h2');
        optionContent.classList.add('option-content','small-heading');
        optionContent.textContent=`${optionsListArray[i]}`;
        eachOptionContainer.appendChild(optionContent);

       
         //On hover Option Container
         ['mouseover','focus'].forEach((event)=>{
         eachOptionContainer.addEventListener(event,(e)=>{
                        
                    eachOptionContainer.children[0].classList.add('selected-option-img-hover');
                         
                })

            });
        
        ['mouseout','blur'].forEach((event)=>{
         eachOptionContainer.addEventListener(event,(e)=>{
                 
                    eachOptionContainer.children[0].classList.remove('selected-option-img-hover');

           })

        });

      



        
   }   

      
      
       sliderProgessColor(questionNumber,NumOfQuestions);
      
      
       //Adding Event Listener for each option and selecting it.
       optionsList =  [...optionsContainer.children];

       ['keypress','click'].forEach( (event) => {
       optionsList.forEach( option=> option.addEventListener( event ,(e)=>{


            if(event ==='keypress' && e.key != 'Enter'){
                 return;

            }
            //Storing the current selection Option
            let clickedOption = e.currentTarget
            
            //If it is already selected removing the selection.
            if(clickedOption.classList.contains('selected-option')){
                clickedOption.classList.remove('selected-option')
                clickedOption.children[0].classList.remove('selected-option-img')
               
                clickedOption = null;
               
                //console.log("clickedO option",clickedOption)
                return
            }

                //If not selected remove other selection and adding the selection.
                optionsList = [...clickedOption.parentNode.children]
                optionsList.forEach(option => option.classList.remove('selected-option'));
                optionsList.forEach(option => option.children[0].classList.remove('selected-option-img'))
                clickedOption.classList.add('selected-option');

               
                clickedOption.children[0].classList.add('selected-option-img')
                //console.log(clickedOption.children[0])
            
         
        })
         )  //forEach End

        })
       

 

        let rightOrWrong = 0;
         
        //Submit Button
        buttonSubmitAnswer.addEventListener('click',()=>{

            //console.log(optionsList);



           //Option Selected 
           for(let i in optionsList){

              if(optionsList[i].classList.contains('selected-option')){

                     if(optionsList[i].children[1].textContent == answer){
                          
                            
                          
                           //Removing  Error Meesage if any 
                            errorMessageContainer.classList.remove('error-container-active');

                            optionsList[i].appendChild(correctIconEl);
                            optionsList[i].classList.add('selected-option-correct');
                            optionsList[i].children[0].classList.add('selected-option-img-correct');
                            
                           //Changing the buttons
                           buttonSubmitAnswer.classList.remove('submit-answer-active')
                           buttonNextQuestion.classList.add('next-question-active')
                           rightOrWrong = 1;
                           return;
                      }

                                //Finding the right Answer
                                optionsList.forEach((option) => {
                                            if(option.children[1].textContent===answer){
                                                    option.appendChild(correctIconEl);
                                            }
                                }) 

                                //Removing Error Message if any
                                errorMessageContainer.classList.remove('error-container-active');
                                
                                //adding the incorrect icon
                                optionsList[i].append(inCorrectIconEl)
                                optionsList[i].classList.add('selected-option-incorrect');
                                optionsList[i].children[0].classList.add('selected-option-img-incorrect');

                                //changing the button
                                buttonSubmitAnswer.classList.remove('submit-answer-active')
                               
                                buttonNextQuestion.classList.add('next-question-active')
                               
                                return;

                }//if selected option found


            
           }//Loop End
           
           
           if(!errorMessageContainer.classList.contains('error-container-active'))
           {
               errorMessageContainer.classList.add('error-container-active');
           }
            
           


        }) //Submit button end

        if(NumOfQuestions== questionNumber){
                                  
            buttonNextQuestion.textContent ='Done'
        }
        buttonNextQuestion.addEventListener('click',()=>{
                  
            resolve(rightOrWrong)

        })




    }); //Promise End
       
}



 // Render Each Question
 function renderQuestion(questionNumber,NumOfQuestions,eachQuestionObject){

    return new Promise(async function(resolve,reject){
        
        const rightWrong =  await renderQuestionHTML(questionNumber,NumOfQuestions,eachQuestionObject.question,eachQuestionObject.options,eachQuestionObject.answer)

         resolve(rightWrong)
    })

}

// Play Again function
function playAgain(){
   return new Promise(function(resolve){
      btnPlayAgain.addEventListener('click',()=>{
           resolve(true)
      })
   });
     
}



// function to get and parse json data.
async function getJsonData(){
    
    try {

            
            const  fetchResponse = await fetch('./data.json');
            
            const quizData  = await fetchResponse.json();
           // console.log(quizData)

            
            
            
            const [selectedSubjectQuestions,selectedIcon,selectecTitle] =  await renderSubjects(quizData);
           //console.log(selectedSubjectQuestions)
 
            
            quizWelcomeSection.classList.remove('quiz-select-active')
            questionSubjectHeader.appendChild(subjectIconheader);
            questionSubjectHeader.appendChild(subjectTitleheader);
           
            let finalScore = 0;

            //Rendering Questions.
            subjectIconheader.src = `${selectedIcon}`
            subjectTitleheader.textContent = `${selectecTitle}`
            
            questionSubjectHeader.classList.add('quiz-subject-active')
            questionSection.classList.add('question-section-active')
            welcomeContainerEl.classList.remove('welcome-container-active')
          
            for(let i in selectedSubjectQuestions){
                    
                //console.log(selectedSubjectQuestions[i])
                 const questionScore  =  await renderQuestion(parseInt(i)+1,selectedSubjectQuestions.length,selectedSubjectQuestions[i]);
                 
                 finalScore += questionScore
                 
                 questionSection.innerHTML = "";

               
                 errorMessageContainer.classList.remove('error-container-active');
                 
                 
             }

           
             questionSection.classList.remove('question-section-active')
             welcomeContainerEl.classList.add('welcome-container-active');
             finalScoreSection.classList.add('final-result-section-active');



             mainHeading.innerHTML = `Quiz Completed </br> <strong>You scored</strong>`;
             mainParagraph.style.display = 'none'
             finalScoreImgIcon.src= `${selectedIcon}`
             finalScoreSubject.textContent = `${selectecTitle}`
             finalScoreEl.textContent = finalScore
             socreOutOfEl.textContent = `Out of ${selectedSubjectQuestions.length}`


            
            const playAgainBool = await playAgain()
             
            finalScoreSection.classList.remove('final-result-section-active');
            questionSubjectHeader.innerHTML = ""
            
            if(playAgainBool){
                subjectContainer.innerHTML="";
                getJsonData()
            }

            

             
    } 
    catch (err)
    {
            console.log(err);
    }
}


getJsonData()



