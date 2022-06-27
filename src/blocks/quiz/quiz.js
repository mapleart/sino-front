let quiz = {
        user: "Dave",
        questions: [
            {
                text: "Что для вас в приоритете?",
                responses: [
                    { text: "Высокое качество перевода" },
                    { text: "Бюджетная цена" },
                    { text: "Бюджетная цена" },
                ]
            },
            {
                text: "Ваши планы по нашему сотрудничеству",
                responses: [
                    { text: "Нужен разовый перевод" },
                    { text: "Регулярно что-то переводите", correct: true },
                ]
            },
            {
                text: "Был ли у вас опыт работы с другими бюро переводов?",
                responses: [
                    { text: "Да", correct: true },
                    { text: "Нет" }
                ]
            },
            {
                text: "Кем вы являетесь?",
                responses: [
                    { text: "Физическое лицо" },
                    { text: "Юридическое лицо", correct: true }
                ]
            }
        ]
    },
    userResponseSkelaton = Array(quiz.questions.length).fill(null);


var app = new Vue({
    el: "#main_quiz",
    data: {
        quiz: quiz,
        questionIndex: 0,
        userResponses: userResponseSkelaton,
        isActive: false
    },

    mounted() {
        console.log('quiz init');
    },

    computed: {
        discount(){
            return this.questionIndex * 3;
        },
        maxIndex(){
            return quiz.questions.length - 1;
        },
        trackStyle(){
            return {
                width: (((this.questionIndex+1)*100) / quiz.questions.length)+'%'
            }
        }
    },
    methods: {
        restart: function(){
            this.questionIndex=0;
            this.userResponses=Array(this.quiz.questions.length).fill(null);
        },
        selectOption: function(index) {
            Vue.set(this.userResponses, this.questionIndex, index);
            //console.log(this.userResponses);
        },
        next: function() {
                if(this.userResponses[this.questionIndex]==null) {
                return false;
            }

                console.log( this.questionIndex, this.quiz.questions.length ,this.questionIndex < this.maxIndex );
            if (this.questionIndex < this.maxIndex) {
                this.questionIndex++;
            } else if(this.questionIndex == this.maxIndex) {
                alert('submit');
                this.restart();
            }

        },

        prev: function() {
            if (this.quiz.questions.length > 0) this.questionIndex--;
        },
        // Return "true" count in userResponses
        score: function() {
            var score = 0;
            for (let i = 0; i < this.userResponses.length; i++) {
                if (
                    typeof this.quiz.questions[i].responses[
                        this.userResponses[i]
                        ] !== "undefined" &&
                    this.quiz.questions[i].responses[this.userResponses[i]].correct
                ) {
                    score = score + 1;
                }
            }
            return score;

            //return this.userResponses.filter(function(val) { return val }).length;
        }
    }
});