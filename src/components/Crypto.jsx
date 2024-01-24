import { useState } from "react";
import { upperCase, lowerCase } from "lodash";


const Crypto = () => {
    const [key, setKey] = useState('');
    const [source, setSource] = useState('');
    const [result, setResult] = useState('');
    const ALPHABET = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const encryptStr = async (s, k) => {
        // make key lowercase
        let keyLower = lowerCase(k);

        // create empty slug array
        let slug = [];

        // copy alphabet
        let slugabet = [...ALPHABET];

        // iterate through key to make slug array, skipping repeats
        for (let char of keyLower) {
            if (slugabet.includes(char)) {
                slug.push(char);
                slugabet.splice(slugabet.indexOf(char), 1);
            } else {
                continue;
            }
        }
        // final slug
        let newSlug = slug.concat(slugabet)
        
        // encryption
        let encryptedStr = "";

        for (let char of s) {
            if (ALPHABET.includes(char)) {
                let index = ALPHABET.indexOf(char);
                encryptedStr += newSlug[index];
            } else if (!ALPHABET.includes(char) && upperCase(char) === char) {
                let charLower = lowerCase(char);
                let index = ALPHABET.indexOf(charLower); 
                encryptedStr += upperCase(newSlug[index]);
            } else if (!ALPHABET.includes(char)) {
                encryptedStr += char;
            }
        }

        setResult(encryptedStr);

    }


    const decryptStr = async (s, k) => {
        // make key lowercase
        let keyLower = lowerCase(k);

        // create empty slug array
        let slug = [];

        // copy alphabet
        let slugabet = [...ALPHABET];

        // iterate through key to make slug array, skipping repeats
        for (let char of keyLower) {
            if (slugabet.includes(char)) {
                slug.push(char);
                slugabet.splice(slugabet.indexOf(char), 1);
            } else {
                continue;
            }
        }
        let newSlug = slug.concat(slugabet);
        console.log(newSlug)

        let decryptedStr = "";

        for (let char of s) {
            if (newSlug.includes(char)) {
                let index = newSlug.indexOf(char);
                decryptedStr += ALPHABET[index];
            } else if (!newSlug.includes(char) && upperCase(char) === char) {
                let charLower = lowerCase(char);
                let index = newSlug.indexOf(charLower);
                decryptedStr += upperCase(ALPHABET[index]);
            } else if (!newSlug.includes(char)) {
                decryptedStr += char;
            }
        }
        setResult(decryptedStr);
    }

    const handleChoice1 = (e) => {
        e.preventDefault();
        encryptStr(source, key)
    }

    const handleChoice2 = (e) => {
        e.preventDefault();
        decryptStr(source, key)
    }

    const handleReset = () => {
        setKey('');
        setSource('');
        setResult('');
        document.getElementById("key").value = "";
        document.getElementById("phrase").value = "";
    }

    return ( 
        <>
        <div className="Crypto">
            <h1>Crypto</h1>
            <p>Enter a key and a phrase. Encrypt or decrypt the phrase. You need the phrase's key in order to decrypt it.</p>
            <form className="input">
                
                <label>Key:</label>
                <input 
                type="text"
                onChange={(e) => setKey(e.target.value)}
                placeholder="bananas"
                id="key"
                />

                <label>Phrase:</label>
                <input 
                type="text"
                onChange={(e) => setSource(e.target.value)}
                placeholder="Hello World!"
                id="phrase"
                />
            </form>

            <form className="encrypt-buttons">
                <button id='encrypt' onClick={handleChoice1}>Encrypt</button>
                <button id='decrypt' onClick={handleChoice2}>Decrypt</button>
            </form>

            <div className="result">
                <p>{result}</p>
            </div>
            <div className="reset">
                <button id='reset' onClick={handleReset}>Reset</button>
            </div>
        </div>
        </>
     );
}
 
export default Crypto;