import React from 'react'
import { useTranslation } from 'react-i18next'

import DefaultLayout from '../../layout/Default'


const LegalMentions = () => {
    const {t} = useTranslation('legal-mentions')

    return (
        <DefaultLayout title={`${t('page-title')} - Instant Visio`}>
            <h2 className="default-title">Informations légales</h2>
            <h3 className="default-smallTitle">1. Présentation du site</h3>
            <p>En vertu de l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique, il est précisé aux utilisateurs du site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> l'identité des différents intervenants dans le cadre de sa réalisation et de son suivi :</p>
            <p><strong>Propriétaire</strong> : Stéphane Luçon – 5, Montée des Chrestiannes, 04860 PIERREVERT<br />
                <strong>Créateur</strong>  : <a href="https://instantvisio.com">Instant Visio</a><br />
                <strong>Responsable publication</strong> : Abeba Ngwe – contact@instantvisio.com<br />
            Le responsable publication est une personne physique ou une personne morale.<br />
                <strong>Webmaster</strong> : Abeba Ngwe – contact@instantvisio.com<br />
                <strong>Hébergeur</strong> : Google, Inc. – Mountain View 1600 Amphitheatre Parkway Mountain View, CA 94043 United States<br />
            Crédits : 
                <a href="https://abebangwe.com" target="_blank" rel="noopener noreferrer">Abeba Ngwe</a>,&nbsp; 
                <a href="https://fr.linkedin.com/in/nicolas-tchouanmou-7029a112" target="_blank" rel="noopener noreferrer">Nicolas Tchouanmou</a>,&nbsp; 
                <a href="http://twitter.com/hugogresse" target="_blank" rel="noopener noreferrer">Hugo Gresse</a>,&nbsp;
                <a href="https://fr.linkedin.com/in/oph%C3%A9lie-strezlec-b40385103" target="_blank" rel="noopener noreferrer">Ophélie Strezlec</a>,&nbsp;
                <a href="https://fr.linkedin.com/in/stephanelucon" target="_blank" rel="noopener noreferrer">Stéphane Luçon</a><br />
            Le modèle de mentions légales est offert par Subdelirium.com <a href="https://www.subdelirium.com/generateur-de-mentions-legales/" target="_blank" rel="noopener noreferrer">Mentions légales</a></p>
        
            <h3 className="default-smallTitle">2. Conditions générales d’utilisation du site et des services proposés</h3>
            <p>L’utilisation du site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> implique l’acceptation pleine et entière des conditions générales d’utilisation ci-après décrites. Ces conditions d’utilisation sont susceptibles d’être modifiées ou complétées à tout moment, les utilisateurs du site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> sont donc invités à les consulter de manière régulière.</p>
            <p>Ce site est normalement accessible à tout moment aux utilisateurs. Une interruption pour raison de maintenance technique peut être toutefois décidée par Stéphane Luçon, qui s’efforcera alors de communiquer préalablement aux utilisateurs les dates et heures de l’intervention.</p>
            <p>Le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> est mis à jour régulièrement par Abeba Ngwe. De la même façon, les mentions légales peuvent être modifiées à tout moment : elles s’imposent néanmoins à l’utilisateur qui est invité à s’y référer le plus souvent possible afin d’en prendre connaissance.</p>
            
            <h3 className="default-smallTitle">3. Description des services fournis</h3>
            <p>Le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> a pour objet de fournir une information concernant l’ensemble des activités de la société.</p>
            <p>Stéphane Luçon s’efforce de fournir sur le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> des informations aussi précises que possible. Toutefois, il ne pourra être tenue responsable des omissions, des inexactitudes et des carences dans la mise à jour, qu’elles soient de son fait ou du fait des tiers partenaires qui lui fournissent ces informations.</p>
            <p>Tous les informations indiquées sur le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> sont données à titre indicatif, et sont susceptibles d’évoluer. Par ailleurs, les renseignements figurant sur le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> ne sont pas exhaustifs. Ils sont donnés sous réserve de modifications ayant été apportées depuis leur mise en ligne.</p>
            
            <h3 className="default-smallTitle">4. Limitations contractuelles sur les données techniques</h3>
            <p>Le site utilise la technologie JavaScript.</p>
            <p>Le site Internet ne pourra être tenu responsable de dommages matériels liés à l’utilisation du site. De plus, l’utilisateur du site s’engage à accéder au site en utilisant un matériel récent, ne contenant pas de virus et avec un navigateur de dernière génération mis à jour.</p>
            
            <h3 className="default-smallTitle">5. Propriété intellectuelle et contrefaçons</h3>
            <p>Stéphane Luçon est propriétaire des droits de propriété intellectuelle ou détient les droits d’usage sur tous les éléments accessibles sur le site, notamment les textes, images, graphismes, logo, icônes, sons, logiciels.</p>
            <p>Toute reproduction, représentation, modification, publication, adaptation de tout ou partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf autorisation écrite préalable de Stéphane Luçon.</p>
            <p>Toute exploitation non autorisée du site ou de l’un quelconque des éléments qu’il contient sera considérée comme constitutive d’une contrefaçon et poursuivie conformément aux dispositions des articles L.335-2 et suivants du Code de Propriété Intellectuelle.</p>
            
            <h3 className="default-smallTitle">6. Limitations de responsabilité</h3>
            <p>Stéphane Luçon ne pourra être tenue responsable des dommages directs et indirects causés au matériel de l’utilisateur, lors de l’accès au site https://instantvisio.com, et résultant soit de l’utilisation d’un matériel ne répondant pas aux spécifications indiquées au point 4, soit de l’apparition d’un bug ou d’une incompatibilité.</p>
            <p>Stéphane Luçon ne pourra également être tenue responsable des dommages indirects (tels par exemple qu’une perte de marché ou perte d’une chance) consécutifs à l’utilisation du site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a>.</p>
            <p>Des espaces interactifs (possibilité de poser des questions dans l’espace contact) sont à la disposition des utilisateurs. Stéphane Luçon se réserve le droit de supprimer, sans mise en demeure préalable, tout contenu déposé dans cet espace qui contreviendrait à la législation applicable en France, en particulier aux dispositions relatives à la protection des données. Le cas échéant, Stéphane Luçon se réserve également la possibilité de mettre en cause la responsabilité civile et/ou pénale de l’utilisateur, notamment en cas de message à caractère raciste, injurieux, diffamant, ou pornographique, quel que soit le support utilisé (texte, photographie…).</p>
        
            <h3 className="default-smallTitle">7. Liens hypertextes et cookies</h3>
            <p>Le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> contient un certain nombre de liens hypertextes vers d’autres sites, mis en place avec l’autorisation de Stéphane Luçon. Cependant, Stéphane Luçon n’a pas la possibilité de vérifier le contenu des sites ainsi visités, et n’assumera en conséquence aucune responsabilité de ce fait.</p>
            <p>La navigation sur le site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> est susceptible de provoquer l’installation de cookie(s) sur l’ordinateur de l’utilisateur. Un cookie est un fichier de petite taille, qui ne permet pas l’identification de l’utilisateur, mais qui enregistre des informations relatives à la navigation d’un ordinateur sur un site. Les données ainsi obtenues visent à faciliter la navigation ultérieure sur le site, et ont également vocation à permettre diverses mesures de fréquentation.</p>
            <p>Le refus d’installation d’un cookie peut entraîner l’impossibilité d’accéder à certains services. L’utilisateur peut toutefois configurer son ordinateur de la manière suivante, pour refuser l’installation des cookies :</p>
            <p>Sous Internet Explorer : onglet outil (pictogramme en forme de rouage en haut a droite) / options internet. Cliquez sur Confidentialité et choisissez Bloquer tous les cookies. Validez sur Ok.</p>
            <p>Sous Firefox : en haut de la fenêtre du navigateur, cliquez sur le bouton Firefox, puis aller dans l'onglet Options. Cliquer sur l'onglet Vie privée.
            Paramétrez les Règles de conservation sur :  utiliser les paramètres personnalisés pour l'historique. Enfin décochez-la pour  désactiver les cookies.</p>
            <p>Sous Safari : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par un rouage). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section "Confidentialité", cliquez sur Paramètres de contenu. Dans la section "Cookies", vous pouvez bloquer les cookies.</p>
            <p>Sous Chrome : Cliquez en haut à droite du navigateur sur le pictogramme de menu (symbolisé par trois lignes horizontales). Sélectionnez Paramètres. Cliquez sur Afficher les paramètres avancés. Dans la section "Confidentialité", cliquez sur préférences.  Dans l'onglet "Confidentialité", vous pouvez bloquer les cookies.</p>
        
            <h3 className="default-smallTitle">8. Droit applicable et attribution de juridiction</h3>
            <p>Tout litige en relation avec l’utilisation du site <a href="http://https://instantvisio.com/" target="_blank" rel="noopener noreferrer">https://instantvisio.com</a> est soumis au droit français. Il est fait attribution exclusive de juridiction aux tribunaux compétents de Paris.</p>
            
            <h3 className="default-smallTitle">9. Les principales lois concernées</h3>
            <p>Loi n° 78-17 du 6 janvier 1978, notamment modifiée par la loi n° 2004-801 du 6 août 2004 relative à l'informatique, aux fichiers et aux libertés.</p>
            <p> Loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique.</p>
            
            <h3 className="default-smallTitle">10. Lexique</h3>
            <p>Utilisateur : Internaute se connectant, utilisant le site susnommé.</p>
            <p>Informations personnelles : « les informations qui permettent, sous quelque forme que ce soit, directement ou non, l'identification des personnes physiques auxquelles elles s'appliquent » (article 4 de la loi n° 78-17 du 6 janvier 1978).</p>
        </DefaultLayout>
    )
}

export default LegalMentions