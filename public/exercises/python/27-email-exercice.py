# =================================================
# Module 27 : Email avec Python
# Fichier d'exercice - À compléter
# =================================================
# NOTE : Ces exercices simulent l'envoi d'emails avec des
# classes mock. Aucune connexion réseau nécessaire.
# =================================================


# Exercice 1 : Construire des messages MIME
# --------------------------------------------
# TODO: Créer des messages email structurés comme dicts

def creer_message_simple(expediteur, destinataire, sujet, corps):
    """
    Crée un message email simple (texte brut).

    Retourne un dict avec les clés :
    - "From": adresse de l'expéditeur
    - "To": adresse du destinataire
    - "Subject": sujet
    - "Content-Type": "text/plain"
    - "Body": corps du message
    - "Date": date au format "YYYY-MM-DD" (date du jour simulée)

    Validation :
    - Le sujet ne doit pas être vide
    - Les adresses doivent contenir un '@'
    - Lever ValueError si validation échoue

    Exemple:
        msg = creer_message_simple(
            "alice@test.com", "bob@test.com",
            "Hello", "Bonjour Bob !"
        )
    """
    # TODO: Créer le message
    pass


def creer_message_html(expediteur, destinataire, sujet, html, texte_fallback=None):
    """
    Crée un message email HTML avec fallback texte.

    Retourne un dict avec :
    - Les mêmes clés que creer_message_simple
    - "Content-Type": "multipart/alternative"
    - "Body-HTML": contenu HTML
    - "Body-Text": version texte (fallback)
    - Si texte_fallback est None, générer un texte brut
      en supprimant les tags HTML du contenu HTML

    Exemple:
        msg = creer_message_html(
            "alice@test.com", "bob@test.com",
            "Rapport", "<h1>Rapport</h1><p>Contenu...</p>"
        )
    """
    # TODO: Créer le message HTML
    pass


def ajouter_piece_jointe(message, nom_fichier, contenu, type_mime="application/octet-stream"):
    """
    Ajoute une pièce jointe à un message.

    Modifie le message en ajoutant/mettant à jour :
    - "Content-Type": "multipart/mixed"
    - "Attachments": liste de dicts avec :
        - "filename": nom du fichier
        - "content": contenu (string)
        - "type": type MIME
        - "size": taille en octets (len du contenu)

    Retourne le message modifié.

    Exemple:
        msg = creer_message_simple(...)
        ajouter_piece_jointe(msg, "data.csv", "nom,age\\nAlice,30")
    """
    # TODO: Ajouter la pièce jointe
    pass


# Exercice 2 : Simuler un serveur SMTP
# ----------------------------------------
# TODO: Créer un MockSMTP qui enregistre les emails envoyés

class MockSMTP:
    """
    Simule un serveur SMTP.

    Attributs :
    - host (str) : adresse du serveur
    - port (int) : port
    - connected (bool) : état de la connexion
    - tls_active (bool) : TLS activé
    - authenticated (bool) : authentifié
    - user (str) : utilisateur connecté
    - sent_messages (list) : liste des messages envoyés
    - log (list) : journal des opérations

    Méthodes :
    - ehlo() : saluer le serveur
    - starttls() : activer TLS
    - login(user, password) : s'authentifier
    - send_message(msg) : envoyer un message
    - quit() : fermer la connexion
    - __enter__/__exit__ : support du context manager
    """

    # Comptes simulés (user → password)
    COMPTES = {
        "alice@test.com": "password123",
        "bob@test.com": "secret456",
        "admin@test.com": "admin789"
    }

    def __init__(self, host, port=587):
        # TODO: Initialiser les attributs
        pass

    def ehlo(self):
        """Salue le serveur. Doit être appelé avant starttls."""
        # TODO: Enregistrer dans le log
        pass

    def starttls(self):
        """Active le chiffrement TLS. Doit être appelé après ehlo."""
        # TODO: Activer TLS, lever une erreur si pas connecté
        pass

    def login(self, user, password):
        """
        S'authentifier. Doit être appelé après starttls.
        Lever une exception si :
        - TLS non actif
        - Identifiants invalides
        """
        # TODO: Vérifier et authentifier
        pass

    def send_message(self, msg):
        """
        Envoie un message. Doit être authentifié.
        Le message doit avoir au moins "From", "To", "Subject".
        Ajoute le message à sent_messages.
        """
        # TODO: Valider et envoyer
        pass

    def quit(self):
        """Ferme la connexion."""
        # TODO: Déconnecter
        pass

    def __enter__(self):
        return self

    def __exit__(self, *args):
        if self.connected:
            self.quit()


# Exercice 3 : Templates d'emails
# -----------------------------------
# TODO: Système de templates avec variables

def creer_template(nom, sujet_template, corps_template):
    """
    Crée un template d'email réutilisable.

    Les variables sont indiquées par {{nom_variable}}.

    Retourne un dict :
    - "nom": nom du template
    - "sujet": template du sujet
    - "corps": template du corps
    - "variables": set des noms de variables trouvées

    Exemple:
        tpl = creer_template(
            "bienvenue",
            "Bienvenue {{prenom}} !",
            "Bonjour {{prenom}} {{nom}},\\nBienvenue sur {{site}}."
        )
        tpl["variables"]  # {"prenom", "nom", "site"}
    """
    # TODO: Parser les templates
    pass


def appliquer_template(template, variables):
    """
    Applique des variables à un template.

    Retourne un dict avec :
    - "sujet": sujet avec les variables remplacées
    - "corps": corps avec les variables remplacées
    - "variables_manquantes": set des variables non fournies

    Si des variables sont manquantes, elles restent sous la forme {{var}}.

    Exemple:
        resultat = appliquer_template(tpl, {"prenom": "Alice", "nom": "Martin"})
        # variables_manquantes = {"site"}
    """
    # TODO: Appliquer les variables
    pass


def envoyer_email_masse(smtp, template, destinataires, variables_communes=None):
    """
    Envoie un email personnalisé à une liste de destinataires.

    destinataires est une liste de dicts :
    [{"email": "...", "prenom": "...", ...}, ...]

    variables_communes (dict) : variables partagées par tous les emails
    (ex: {"site": "MonApp"})

    Retourne un dict :
    - "envoyes": nombre d'emails envoyés avec succès
    - "erreurs": liste de dicts {"email": str, "erreur": str}

    Exemple:
        envoyer_email_masse(smtp, template,
            [{"email": "alice@test.com", "prenom": "Alice"}],
            {"site": "MonApp"})
    """
    # TODO: Envoyer les emails
    pass


# Exercice 4 : Parser des emails bruts
# ----------------------------------------
# TODO: Parser des emails au format texte brut

def parser_email_brut(texte_brut):
    """
    Parse un email brut en format texte.

    Le format est :
        From: expediteur@example.com
        To: destinataire@example.com
        Subject: Sujet de l'email
        Date: 2024-01-15
        Content-Type: text/plain

        Corps du message ici.
        Peut être sur plusieurs lignes.

    Retourne un dict avec :
    - "headers": dict des en-têtes
    - "body": corps du message (string)
    - "has_attachment": bool (True si Content-Type contient "multipart")

    Gère les en-têtes sur plusieurs lignes (lignes continuées par un espace).
    """
    # TODO: Parser l'email
    pass


def extraire_adresses(texte):
    """
    Extrait toutes les adresses email d'un texte.
    Format : quelquechose@domaine.extension

    Retourne une liste d'adresses uniques, triées.

    Exemple:
        extraire_adresses("Contact: alice@test.com ou bob@test.com")
        → ["alice@test.com", "bob@test.com"]
    """
    # TODO: Extraire les adresses avec regex
    pass


# Exercice 5 : Système de notifications
# -----------------------------------------
# TODO: Système complet de notifications par email

class NotificationManager:
    """
    Gestionnaire de notifications par email.

    Fonctionnalités :
    - Enregistrer des templates de notification
    - Enregistrer des abonnés avec leurs préférences
    - Envoyer des notifications ciblées
    - Historique des notifications envoyées

    Attributs :
    - templates: dict {nom: template}
    - abonnes: dict {email: {"nom": str, "preferences": set de types}}
    - historique: list de notifications envoyées
    - smtp: instance de MockSMTP
    """

    def __init__(self, smtp):
        # TODO: Initialiser
        pass

    def ajouter_template(self, nom, sujet, corps):
        """Ajoute un template de notification."""
        # TODO: Ajouter le template
        pass

    def ajouter_abonne(self, email, nom, preferences=None):
        """
        Ajoute un abonné.
        preferences : set de types de notifications acceptées.
        Par défaut : {"info", "alerte", "rapport"}
        """
        # TODO: Ajouter l'abonné
        pass

    def retirer_abonne(self, email):
        """Retire un abonné."""
        # TODO: Retirer l'abonné
        pass

    def envoyer_notification(self, type_notif, template_nom, variables=None):
        """
        Envoie une notification à tous les abonnés qui acceptent ce type.

        Retourne un dict :
        - "type": type de notification
        - "envoyes": nombre d'emails envoyés
        - "destinataires": liste des emails
        - "erreurs": liste des erreurs
        """
        # TODO: Envoyer la notification
        pass

    def obtenir_historique(self, email=None, type_notif=None):
        """
        Filtre l'historique des notifications.
        Si email est fourni, filtre par destinataire.
        Si type_notif est fourni, filtre par type.
        """
        # TODO: Filtrer l'historique
        pass


# ======================
# Tests
# ======================
if __name__ == "__main__":
    print("=" * 50)
    print("TEST EXERCICE 1 : Messages MIME")
    print("=" * 50)

    msg = creer_message_simple(
        "alice@test.com", "bob@test.com",
        "Test", "Bonjour Bob !"
    )
    if msg:
        print(f"  From: {msg.get('From')}")
        print(f"  To: {msg.get('To')}")
        print(f"  Subject: {msg.get('Subject')}")

    msg_html = creer_message_html(
        "alice@test.com", "bob@test.com",
        "Rapport", "<h1>Titre</h1><p>Contenu du rapport</p>"
    )
    if msg_html:
        print(f"  HTML Content-Type: {msg_html.get('Content-Type')}")
        print(f"  Body-Text: {msg_html.get('Body-Text')}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 2 : MockSMTP")
    print("=" * 50)

    try:
        with MockSMTP("smtp.test.com", 587) as smtp:
            smtp.ehlo()
            smtp.starttls()
            smtp.login("alice@test.com", "password123")
            if msg:
                smtp.send_message(msg)
                print(f"  Messages envoyés : {len(smtp.sent_messages)}")
                print(f"  Log : {smtp.log}")
    except Exception as e:
        print(f"  Erreur : {e}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 3 : Templates")
    print("=" * 50)

    tpl = creer_template(
        "bienvenue",
        "Bienvenue {{prenom}} !",
        "Bonjour {{prenom}} {{nom}},\nBienvenue sur {{site}}."
    )
    if tpl:
        print(f"  Variables : {tpl.get('variables')}")
        resultat = appliquer_template(tpl, {"prenom": "Alice", "nom": "Martin", "site": "MemoCode"})
        if resultat:
            print(f"  Sujet : {resultat['sujet']}")
            print(f"  Corps : {resultat['corps']}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 4 : Parser email brut")
    print("=" * 50)

    email_brut = """From: alice@example.com
To: bob@example.com
Subject: Reunion demain
Date: 2024-01-15
Content-Type: text/plain

Bonjour Bob,

N'oublie pas la reunion demain a 14h.
Salle B203.

Cordialement,
Alice"""

    parsed = parser_email_brut(email_brut)
    if parsed:
        print(f"  Headers : {parsed['headers']}")
        print(f"  Body preview : {parsed['body'][:50]}...")

    adresses = extraire_adresses(
        "Contact alice@test.com ou bob@test.com, cc: admin@test.com"
    )
    if adresses:
        print(f"  Adresses : {adresses}")

    print("\n" + "=" * 50)
    print("TEST EXERCICE 5 : Notifications")
    print("=" * 50)

    smtp = MockSMTP("smtp.test.com", 587)
    smtp.ehlo()
    smtp.starttls()
    smtp.login("admin@test.com", "admin789")

    manager = NotificationManager(smtp)
    if manager:
        manager.ajouter_template(
            "alerte_systeme",
            "ALERTE : {{message}}",
            "Bonjour {{nom}},\n\nAlerte système : {{message}}\nSévérité : {{severite}}"
        )
        manager.ajouter_abonne("alice@test.com", "Alice", {"info", "alerte"})
        manager.ajouter_abonne("bob@test.com", "Bob", {"info"})

        resultat = manager.envoyer_notification("alerte", "alerte_systeme", {
            "message": "CPU > 90%",
            "severite": "haute"
        })
        if resultat:
            print(f"  Envoyés : {resultat['envoyes']}")
            print(f"  Destinataires : {resultat['destinataires']}")
