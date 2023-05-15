class node{
    constructor(key, parent = null){
        this.key = key;
        this.parent = parent;
        this.left = null;
        this.right = null;
        this.heigth = null; //only for avl trees
    }
}

class bst{
    constructor(root){
        this.root = new node(root);
        console.log("new tree with root "+this.root.key)
    }
    insert(element){
        let x = this.root;
        let y = null;
        let insertedAtLeft = null; //used for avl properties
        while(x != null){
            y = x;
            if(element < x.key){
                x = x.left;
            }else{
                x = x.right;
            }
        }
        if(y == null){
            this.root = new node(element);
        }else if(element > y.key){
            y.right = new node(element, y);
            insertedAtLeft = false;
            console.log("inseted node as right child of ", y.key);
        }else{
            y.left = new node(element, y);
            insertedAtLeft = true;
            console.log("inseted node as left child of ", y.key);
        }
    }
    search(key, node = this.root){
        if(node == null || key == node.key) return node;
        if(key < node.key){
            return this.search(key, node.left);
        }else{
            return this.search(key, node.right);
        }
    }
    min(startnode){
        let x = startnode;
        let y = null;
        while(x!=null){
            y = x;
            x = x.left;
        }
        return y;
    }
    max(startnode){
        let x = startnode;
        let y = null;
        while(x!=null){
            y = x;
            x = x.right;
        }
        return y;
    }
    predecessor(node){
        if(node.left != null){
            return this.max(node.left);
        }
        let x = node;
        let y = node.parent;
        while(y!=null && x == y.left){
            x = y;
            y = y.parent;
        }
        return y;
    }
    successor(node){
        if(node.right != null){
            return this.min(node.right);
        }
        let x = node;
        let y = node.parent;
        while(y!=null && x == y.right){
            x = y;
            y = y.parent;
        }
        return y;
    }
    replace(x, y){
        if(x.parent == null){
            this.root = y;
        }else if(x == x.parent.left){
            x.parent.left = y;
        }else{
            x.parent.right = y;
        }
        if(y != null){
            y.parent = x.parent;
        }
    }
    delete(node){
        if(node.left == null && node.right == null){ //deleting a leaf node
            this.replace(node, null);
            console.log("mahnah listo")
            return node;
        }
        if(node.left == null || node.right == null){ //deleting node /w one child
            let child = null;
            if(node.left == null){
                child = node.right;
            }else{
                child = node.left;
            }
            this.replace(node, child);
            console.log("mahnah s eno 4awe");
            return node;
        }
        //if the node has two children
        let y = this.successor(node);
        if(y.parent != node){
            this.replace(y, y.right);
            y.right = node.right;
            y.right.parent = y;
        }
        this.replace(node, y);
        y.left = node.left;
        y.left.parent = y;
        return node;
    }
    inorderTraversal(node){
        if(node != null){
            this.inorderTraversal(node.left);
            console.log(node);
            this.inorderTraversal(node.right);
        }
   } 
}

class avl extends bst{
    constructor(root){
        super(root);
    }
    getHeight(node, clean=false){
        if(node == null)return -1;
        if(node.heigth != null && clean == false){
            return node.heigth;
        }else{
            if(clean){ //makes recursive calls clean if the first call was clean
                node.heigth = 1+Math.max(this.getHeight(node.left, true), this.getHeight(node.right, true));
                return node.heigth;
            }
            node.heigth = 1+Math.max(this.getHeight(node.left), this.getHeight(node.right));
            return node.heigth; 
        }
    }
    getBalance(node){
        return this.getHeight(node.right)-this.getHeight(node.left); //positive means right heavy 
    }
    /*update(node){ //procedure for the just inserted node
        this.getHeight(root, true);
        return this.getBalance(node);
    }*/
    balance(node){

    }
    insert(element){
        super.insert(element);
        this.getHeight(this.root); //updates all node heights
        if(super.insertedAtLeft){
            //this.update(super.y.left);        
        }else{
            //this.update(super.y.right);
        }
    }
    rotateRight(x){
        let y = x.left;
        let p = x.parent;
        if(y.right != null){
            x.left = y.right;
            x.left.parent = x;
        }
        y.right = x;
        x.parent = y;
        y.parent = p;
        if(p != null){
            if(p.left == x){
                p.left = y;
            }else{
                p.right = y;
            }
        }else{
            this.root = y;
        }
        return y;
    }
    rotateLeft(x){
        let y = x.right;
        let p = x.parent;
        if(y.left != null){
            x.right = y.left;
            x.right.parent = x;
        }
        y.left = x;
        x.parent = y;
        y.parent = p;
        if(p != null){
            if(p.left == x){
                p.left = y;
            }else{
                p.right = y;
            }
        }else{
            this.root = y;
        }
    }

}

