import Vue from 'vue'
import { tStr } from "validation_t/src";

Vue.directive("currency", {
    inserted: function (el, binding){
        // console.log(binding)
    }
})

Vue.directive("custext", {
    bind(el, binding, vnode){
        // console.log("Gia tri hien tai: "); console.log(el.innerText);
        // console.log(binding)
        // console.log(vnode);
        let handler = function(e){
            // console.log(vnode)

            const character_pattern = new RegExp(/[a-zA-Z,\W]/, "g");
            const number_parttern = new RegExp(/^-?\d+\.?\d*$/, "g");
            const number_for_replace = new RegExp(/[^0-9.-]/, "g")

            let texttype = binding.value;   //umber - position integer
            if (texttype == "number"){
                if (!number_parttern.test(e.target.value))
                {
                    //e.preventDefault();
                    e.target.value = e.target.value.replace(number_for_replace, '');
                    vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
                    // console.log(vnode)
                    
                }
            } else if (texttype == "positioninteger"){
                //kiem tra neu ...
                if (character_pattern.test(e.target.value)) {
                    e.target.value = e.target.value.replace(character_pattern, '');
                    vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
                }
            } else if (texttype == "currency"){
                if (isNaN(e.target.value)) {
                    e.target.value = e.target.value.replace(character_pattern, '');
                    vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
                }
                e.target.value = tStr.getCurrency(e.target.value)
            }           
        
            
        }

        el.addEventListener('input', handler);
    }
});

// Vue.directive('maxchars', {
//     update(el, binding, vnode) {
//       var event = new Event("input", { bubbles: true });
//       let maxChars = binding.value;
//         if (el.value.length > maxChars) {
//           el.value = e.value.substr(0, maxChars);
//           el.dispatchEvent(event);
//         }
//     }
// });

Vue.directive('maxchars', {
    bind(el, binding, vnode) {
      let maxChars = binding.value;
      let handler = function(e) {
        // console.log(e.target.value)
        //khi thay doi gia tri trong input
        //se trigger input event
        if (e.target.value.length > maxChars) {
          e.target.value = e.target.value.substr(0, maxChars);
          vnode.elm.dispatchEvent(new CustomEvent('input')); // added this
        }
      }
      el.addEventListener('input', handler);
    }
});